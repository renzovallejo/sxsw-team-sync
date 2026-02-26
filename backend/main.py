from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
import json
import logging
from typing import Optional
import urllib.request
from bs4 import BeautifulSoup

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="SXSW Team Sync API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "SXSW Team Sync API is running"}

@app.get("/api/generate-schedule")
def generate_schedule(
    day: Optional[str] = Query(None),
    event_type: Optional[str] = Query(None),
    ignore_proximity: bool = Query(False),
    must_attend_speakers: Optional[str] = Query(None)
):
    """
    Lee el archivo de datos local (sxsw_schedule_seleccion.xlsx) y genera las agendas optimizadas.
    Filtra por día si se pasa el query param 'day'.
    Filtra por tipo de evento si se pasa 'event_type'.
    """
    try:
        import os
        base_dir = os.path.dirname(os.path.abspath(__file__))
        data_path = os.path.join(base_dir, "sxsw_schedule_seleccion.xlsx")
        
        df = pd.read_excel(data_path)
        logger.info(f"Loaded local data with columns: {df.columns.tolist()}")
        
        # Mapeamos 'Title' a 'Event Name' si el excel original usa 'Title'
        if 'Title' in df.columns:
            df.rename(columns={'Title': 'Event Name'}, inplace=True)
            
        # Filtrar por día si aplica
        if day and 'Date' in df.columns:
            # Asegurarse de que el match de string sea exacto (ej. '2026-03-12')
            df['Date'] = df['Date'].astype(str)
            df = df[df['Date'].str.contains(day, na=False)]
            
        # Filtrar por tipo si aplica
        if event_type and event_type != "Todos" and 'Type' in df.columns:
            df['Type'] = df['Type'].astype(str)
            df = df[df['Type'].str.contains(event_type, case=False, na=False)]
            logger.info(f"Filtered for event_type={event_type}, remaining rows: {len(df)}")
            
        # Validar y limpiar las columnas
        if 'Event Name' not in df.columns or 'Location' not in df.columns:
            logger.error("Missing mandatory columns.")
            raise ValueError("CSV is missing 'Event Name' or 'Location' columns.")
            
        df = df.dropna(subset=['Event Name', 'Location'])
        records = df.to_dict(orient='records')
        logger.info(f"Successfully cleaned {len(records)} valid events.")
        
        # Procesar Must-Attend Speakers si aplican
        target_speakers = [s.strip().lower() for s in must_attend_speakers.split(',')] if must_attend_speakers else []
        if target_speakers:
            logger.info(f"Target speakers: {target_speakers}")
            for r in records:
                r['Is Priority'] = False
                url = str(r.get('URL', ''))
                if url.startswith('http'):
                    try:
                        req = urllib.request.Request(url, headers={'User-Agent': "Mozilla/5.0"})
                        html = urllib.request.urlopen(req).read()
                        soup = BeautifulSoup(html, 'html.parser')
                        
                        event_speakers = []
                        for a in soup.find_all('a', href=True):
                            if '/speakers/' in a['href'] or '/2026/speakers/' in a['href']:
                                event_speakers.append(a.text.strip().lower())
                                
                        # Si algún speaker coincide
                        if any(ts in event_speakers for ts in target_speakers):
                            r['Is Priority'] = True
                            logger.info(f"Priority Match! Event: {r['Event Name']}")
                    except Exception as e:
                        logger.warning(f"Failed to scrape {url}: {e}")
        else:
             for r in records:
                r['Is Priority'] = False
                
        # Integrar aquí el algoritmo de clustering y OR-Tools
        from routing import calculate_distance_matrix, run_routing_algorithm
        
        api_key = "mock_key"
        locations = [r['Location'] for r in records]
        
        # 1. Obtener la matriz de distancias (Simulada por ahora)
        distance_matrix = calculate_distance_matrix(locations, api_key)
        
        if ignore_proximity:
            n = len(distance_matrix)
            distance_matrix = [[0] * n for _ in range(n)]
            logger.info("Ignoring proximity: distance matrix has been zeroed out.")
        
        # 2. Correr el ruteador local Greedy time-window
        agendas, unassigned_events = run_routing_algorithm(records, distance_matrix, num_agents=4)
        
        return {
            "status": "success",
            "message": f"Successfully generated schedules for {len(records)} events from local source.",
            "events_preview": records[:5], 
            "agents_schedule": agendas,
            "unassigned_events": unassigned_events
        }
    except Exception as e:
        logger.error(f"Error generating schedule: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
