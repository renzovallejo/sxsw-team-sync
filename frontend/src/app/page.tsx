"use client";

import { useState } from "react";
import { CalendarView, EventItem } from "@/components/CalendarView";
import { Activity, Sparkles } from "lucide-react";

const AVAILABLE_DAYS = [
  { value: "2026-03-12", label: "Jueves 12 de Marzo" },
  { value: "2026-03-13", label: "Viernes 13 de Marzo" },
  { value: "2026-03-14", label: "Sábado 14 de Marzo" },
  { value: "2026-03-15", label: "Domingo 15 de Marzo" },
  { value: "2026-03-16", label: "Lunes 16 de Marzo" },
];

const AVAILABLE_TYPES = [
  { value: "Todos", label: "Todos los Tipos" },
  { value: "charla", label: "Charlas" },
  { value: "workshop", label: "Talleres (Workshops)" },
  { value: "exhibición", label: "Exhibiciónes" }
];

export default function Home() {
  const [agendas, setAgendas] = useState<EventItem[][]>([]);
  const [unassigned, setUnassigned] = useState<EventItem[]>([]);
  const [stats, setStats] = useState({ totalEvents: 0, maxWalk: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState(AVAILABLE_DAYS[0].value);
  const [selectedType, setSelectedType] = useState(AVAILABLE_TYPES[0].value);
  const [ignoreProximity, setIgnoreProximity] = useState(false);
  const [mustAttendSpeakers, setMustAttendSpeakers] = useState("");

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setAgendas([]);
    setUnassigned([]);

    try {
      // Temporary: Fake delay to show nice loading state
      await new Promise(resolve => setTimeout(resolve, 800));

      const params = new URLSearchParams({
        day: selectedDay,
        event_type: selectedType,
        ignore_proximity: String(ignoreProximity)
      });
      if (mustAttendSpeakers.trim() !== "") {
        params.append("must_attend_speakers", mustAttendSpeakers);
      }

      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_BASE}/api/generate-schedule?${params.toString()}`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Error al procesar el archivo con el servidor Backend.");
      }

      const data = await res.json();

      if (data.status === "success" && data.agents_schedule) {
        setAgendas(data.agents_schedule);
        let sum = 0;
        let maxw = 0;
        data.agents_schedule.forEach((agent: EventItem[]) => {
          sum += agent.length;
          agent.forEach((e: EventItem) => {
            maxw = Math.max(maxw, e["Walking Time To Next"] || 0);
          });
        });
        setStats({ totalEvents: sum, maxWalk: maxw });
      } else {
        setError(data.message || "Error Desconocido");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Fallo interactuando con el backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center">
            <Activity className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            SXSW <span className="text-gradient">Equipo CIX</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full border border-panel-border overflow-hidden bg-panel-dark p-1">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Felix`} alt="User" className="w-full h-full rounded-full" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Left/Top Sidebar (Controls & Stats) */}
        <div className="lg:col-span-1 space-y-6 flex flex-col">

          <div className="glass-panel p-6 w-full flex flex-col items-center justify-center min-h-[200px]">
            <h3 className="text-xl font-bold text-white mb-2 text-center">Programador Inteligente</h3>
            <p className="text-gray-400 text-sm text-center mb-4">
              Procesa los datos de SXSW y distribuye eventos óptimamente para las 4 personas en el día seleccionado.
            </p>

            <div className="w-full space-y-4 mb-6 relative">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Día del Evento</label>
                <div className="relative">
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full bg-panel-dark border border-panel-border rounded-lg text-white appearance-none px-4 py-2 hover:border-brand-purple focus:outline-none focus:border-brand-cyan transition-colors"
                  >
                    {AVAILABLE_DAYS.map(d => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-[10px] pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Filtro de Tipo</label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-panel-dark border border-panel-border rounded-lg text-white appearance-none px-4 py-2 hover:border-brand-purple focus:outline-none focus:border-brand-cyan transition-colors"
                  >
                    {AVAILABLE_TYPES.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-[10px] pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="ignoreProx"
                  checked={ignoreProximity}
                  onChange={(e) => setIgnoreProximity(e.target.checked)}
                  className="w-4 h-4 rounded border border-panel-border bg-panel-dark text-brand-cyan focus:ring-brand-cyan focus:ring-offset-panel-dark transition-all"
                />
                <label htmlFor="ignoreProx" className="ml-2 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors">
                  Omitir la cercanía de locales al asignar
                </label>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-2 mt-4">
                <label className="block text-xs font-medium text-brand-cyan mb-1 flex items-center">
                  <Sparkles size={12} className="mr-1" />
                  Speakers Obligatorios (Must-Attend)
                </label>
                <input
                  type="text"
                  value={mustAttendSpeakers}
                  onChange={(e) => setMustAttendSpeakers(e.target.value)}
                  placeholder="Ej. Brené Brown, Mark Cuban..."
                  className="w-full bg-panel-dark border border-panel-border rounded-lg text-sm text-white px-4 py-2 placeholder-gray-500 focus:outline-none focus:border-brand-purple transition-colors"
                />
                <p className="text-[10px] text-gray-500 leading-tight">
                  El sistema extraerá los enlaces y forzará prioridad máxima para estos oradores (separados por coma).
                </p>
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full group relative flex items-center justify-center px-6 py-3 rounded-xl bg-panel-dark border border-panel-border hover:border-brand-purple overflow-hidden transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              {isLoading ? (
                <div className="flex items-center space-x-2 relative z-10">
                  <div className="h-4 w-4 rounded-full border-2 border-b-brand-cyan animate-spin"></div>
                  <span className="font-semibold text-white">Optimizando...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 relative z-10">
                  <Sparkles size={18} className="text-brand-purple group-hover:text-brand-cyan transition-colors" />
                  <span className="font-semibold text-white">Generar Agendas</span>
                </div>
              )}
            </button>
            {error && (
              <div className="mt-4 p-3 w-full rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
          </div>

          {/* Stats Panel */}
          <div className="glass-panel p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-bold mb-4 text-white">Estadísticas de Optimización</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-400">Total Eventos Asignados</p>
                <p className="text-3xl font-black text-white">{stats.totalEvents}</p>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-400">Tiempo Máx. caminata</p>
                <div className="flex items-end space-x-2">
                  <p className="text-3xl font-black text-brand-cyan">{stats.maxWalk}</p>
                  <p className="text-lg text-gray-400 mb-1">mins</p>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-sm text-gray-400">Utilización del Equipo</p>
                <div className="w-full h-3 bg-panel-dark rounded-full mt-2 overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan w-[85%] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right/Bottom Main View (Calendar) */}
        <div className="lg:col-span-3 h-[calc(100vh-140px)]">
          <CalendarView agendas={agendas} unassignedEvents={unassigned} selectedDay={selectedDay} />
        </div>
      </main>
    </div>
  );
}
