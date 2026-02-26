import logging
from typing import List, Dict, Any
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)

def parse_time(t_str: str) -> int:
    """Convierte un string de tiempo a minutos desde la medianoche para comparaciones"""
    try:
        # Intenta parsear AM/PM o 24hr
        if 'M' in t_str.upper():
            dt = datetime.strptime(t_str.strip(), "%I:%M %p")
        else:
            dt = datetime.strptime(t_str.strip(), "%H:%M")
        return dt.hour * 60 + dt.minute
    except Exception:
        # Fallback si el string no tiene buen formato
        return 0

def calculate_distance_matrix(locations: List[str], api_key: str) -> List[List[int]]:
    """
    Calcula una matriz de distancia local (sin API) asumiendo que es en Downtown Austin.
    """
    n = len(locations)
    matrix = []
    
    # Extraer el nombre principal del venue (primera linea) para comparar
    def extract_venue(loc_str):
        if not loc_str or not isinstance(loc_str, str): return "Unknown"
        return loc_str.split('\n')[0].strip().lower()

    venues = [extract_venue(l) for l in locations]
    
    for i in range(n):
        row = []
        for j in range(n):
            if i == j:
                row.append(0)
            else:
                v1 = venues[i]
                v2 = venues[j]
                
                # Si es el mismo edificio (ej. "JW Marriott"), 5 mins de caminata interna
                if v1 == v2:
                    row.append(5)
                # Locaciones directamente aledañas o muy conocidas
                elif ("fairmont" in v1 and "marriott" in v2) or ("marriott" in v1 and "fairmont" in v2):
                    row.append(10)
                elif ("hilton" in v1 and "marriott" in v2) or ("marriott" in v1 and "hilton" in v2):
                    row.append(8)
                else:
                    # Promedio flat para caminar en downtown Austin entre venues que no coinciden
                    row.append(15)
        matrix.append(row)
    return matrix


def run_routing_algorithm(events: List[Dict[str, Any]], distance_matrix: List[List[int]], num_agents: int = 4) -> tuple[List[List[Dict[str, Any]]], List[Dict[str, Any]]]:
    """
    Asigna eventos a N agentes usando un algoritmo codicioso basandose en tiempo real y distancias de caminata.
    Exige 25 minutos de separación mínima. Retorna las agendas y la lista de eventos sin asignar.
    """
    # 1. Parsear tiempos para cada evento y agregarlos temporalmente para ordenar
    parsed_events = []
    for idx, e in enumerate(events):
        start_m = parse_time(str(e.get('Start Time', '09:00')))
        end_m = parse_time(str(e.get('End Time', '10:00')))
        
        # Si end_m es menor que start_m, asumimos que cruza la medianoche (ej. 1 AM)
        if end_m < start_m:
            end_m += 1440
            
        parsed_events.append({
            'original_event': e,
            'original_index': idx,
            'start_m': start_m,
            'end_m': end_m,
            'is_priority': e.get('Is Priority', False)
        })
        
    # Ordenar eventos cronológicamente por hora de inicio, pero empujando Priority arriba dentro del mismo bloque horario
    # Hacemos un sort dual por is_priority desc, start pre
    parsed_events.sort(key=lambda x: (not x['is_priority'], x['start_m']))
    
    # Agendas de los agentes. Cada una guarda los eventos a los que van.
    # Usaremos una lista separada para trackear donde están y en qué minuto se desocupan
    agendas = [[] for _ in range(num_agents)]
    agent_states = [{'free_at': 0, 'last_loc_idx': -1} for _ in range(num_agents)]
    unassigned_events = []
    
    for pe in parsed_events:
        evt = pe['original_event']
        start_m = pe['start_m']
        end_m = pe['end_m']
        evt_idx = pe['original_index']
        
        # Encontrar el mejor agente para asignar (el que llegue a tiempo o más cerca de llegar)
        # Queremos minimizar el tiempo muerto, pero DEBEN cumplir el gap de 25mins y el travel_time
        best_agent = -1
        best_slack = float('inf')
        
        for a_idx in range(num_agents):
            state = agent_states[a_idx]
            free_time = state['free_at']
            
            travel_time = 0
            if state['last_loc_idx'] != -1:
                travel_time = distance_matrix[state['last_loc_idx']][evt_idx]
                
            # Calcular requerimiento de tiempo
            # Si es el primer evento del agente, no necesita gap de 25 min previo
            if state['last_loc_idx'] == -1:
                required_gap = 0
            else:
                required_gap = max(25, travel_time)
                
            arrival_time = free_time + required_gap
            
            # Si el agente llega con los 25 mins de descanso cumplidos
            if arrival_time <= start_m:
                slack = start_m - arrival_time
                if slack < best_slack:
                    best_slack = slack
                    best_agent = a_idx
        
        # Si ningún agente puede asistir, va a no asignados
        if best_agent == -1:
            unassigned_events.append(evt)
        else:
            # Asignar
            state = agent_states[best_agent]
                
            evt_copy = dict(evt)
            evt_copy['Assigned Agent'] = best_agent
            evt_copy['Walking Time To Next'] = 0 # Lo actualizaremos luego
            
            agendas[best_agent].append(evt_copy)
            
            # Actualizar estado del agente
            state['free_at'] = end_m
            state['last_loc_idx'] = evt_idx
        
    # Post-procesamiento: Calcular Walking Time To Next
    for a_idx in range(num_agents):
        for i in range(len(agendas[a_idx])):
             # Walking time to next
             if i < len(agendas[a_idx]) - 1:
                 loc_i = events.index(next(e for e in events if e['Event Name'] == agendas[a_idx][i]['Event Name']))
                 loc_j = events.index(next(e for e in events if e['Event Name'] == agendas[a_idx][i+1]['Event Name']))
                 agendas[a_idx][i]['Walking Time To Next'] = distance_matrix[loc_i][loc_j]
             
             # Buscar un backup (Plan B) para el evento actual
             current_evt = agendas[a_idx][i]
             c_start_m = parse_time(str(current_evt.get('Start Time', '09:00')))
             
             best_backup = None
             best_backup_dist = float('inf')
             
             for u_evt in unassigned_events:
                 u_start_m = parse_time(str(u_evt.get('Start Time', '09:00')))
                 # Mismo bloque horario (margen de 30 mins)
                 if abs(c_start_m - u_start_m) <= 30:
                     c_loc_idx = events.index(next(e for e in events if e['Event Name'] == current_evt['Event Name']))
                     u_loc_idx = events.index(next(e for e in events if e['Event Name'] == u_evt['Event Name']))
                     dist = distance_matrix[c_loc_idx][u_loc_idx]
                     
                     if dist < best_backup_dist:
                         best_backup_dist = dist
                         best_backup = u_evt
                         
             if best_backup:
                 current_evt['Backup Event'] = best_backup

    return agendas, unassigned_events
