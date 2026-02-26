import { motion } from 'framer-motion';
import { Download, Map } from "lucide-react";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

export interface EventItem {
    "Event Name": string;
    "Start Time": string;
    "End Time": string;
    "Location": string;
    "Assigned Agent": number;
    "Walking Time To Next": number;
    "Scheduled Start (min)"?: number;
    "Date"?: string;
    "UID"?: string;
    "Backup Event"?: EventItem;
}

interface CalendarViewProps {
    agendas: EventItem[][];
    unassignedEvents?: EventItem[];
    selectedDay?: string;
}

// Helper for ICS Date Parsing
const formatICSDate = (dateStr: string, timeStr: string) => {
    try {
        const cleanDate = dateStr.replace(/-/g, ""); // "20260312"
        const cleanTime = timeStr.replace(/:/g, "").substring(0, 6).padEnd(6, '0');
        return `${cleanDate}T${cleanTime}`;
    } catch (e) {
        return "20260312T000000"; // fallback
    }
};

const colors = [
    "from-brand-cyan/20 to-brand-cyan/5 border-brand-cyan/50",
    "from-brand-purple/20 to-brand-purple/5 border-brand-purple/50",
    "from-pink-500/20 to-pink-500/5 border-pink-500/50",
    "from-blue-500/20 to-blue-500/5 border-blue-500/50"
];

const textColors = [
    "text-brand-cyan",
    "text-brand-purple",
    "text-pink-400",
    "text-blue-400"
];

export function CalendarView({ agendas: initialAgendas, unassignedEvents, selectedDay = "2026-03-12" }: CalendarViewProps) {
    const [localAgendas, setLocalAgendas] = useState<EventItem[][]>([]);
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
        // Deep copy to allow local mutation via DND
        setLocalAgendas(JSON.parse(JSON.stringify(initialAgendas || [])));
    }, [initialAgendas]);

    if (!localAgendas || localAgendas.length === 0) {
        return (
            <div className="glass-panel w-full h-full flex items-center justify-center text-gray-400">
                Genera una agenda para visualizar la optimización
            </div>
        );
    }

    const handleExportICS = (agentIndex: number) => {
        const agentEvents = localAgendas[agentIndex];
        if (!agentEvents || agentEvents.length === 0) return;

        let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//SXSW Team Sync//EN\n";
        const agentName = String(agentIndex + 1);

        agentEvents.forEach((evt, evtCount) => {
            const startDate = evt.Date || selectedDay;
            const uid = evt.UID || `evt-${agentIndex}-${evtCount}`;
            const dtStart = formatICSDate(startDate, evt["Start Time"] || "09:00:00");
            const dtEnd = formatICSDate(startDate, evt["End Time"] || "10:00:00");

            icsContent += `BEGIN:VEVENT\n`;
            icsContent += `UID:${uid}@sxswteamsync.com\n`;
            icsContent += `DTSTAMP:${dtStart}Z\n`;
            icsContent += `DTSTART;TZID=America/Chicago:${dtStart}\n`;
            icsContent += `DTEND;TZID=America/Chicago:${dtEnd}\n`;
            icsContent += `SUMMARY:${evt["Event Name"]} - Persona ${agentName}\n`;
            if (evt["Location"]) icsContent += `LOCATION:${evt["Location"]}\n`;
            icsContent += `END:VEVENT\n`;
        });

        icsContent += "END:VCALENDAR";

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Agenda_Persona_${agentName}_${selectedDay}.ics`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleExportMap = (agentIndex: number) => {
        const agentEvents = localAgendas[agentIndex];
        if (!agentEvents || agentEvents.length === 0) return;

        const locations = agentEvents.map(e => e["Location"]).filter(Boolean);
        if (locations.length === 0) return;

        const origin = encodeURIComponent(locations[0]);
        const destination = encodeURIComponent(locations[locations.length - 1]);

        let url = `https://www.google.com/maps/dir/?api=1&travelmode=walking&origin=${origin}&destination=${destination}`;

        if (locations.length > 2) {
            const waypoints = locations.slice(1, -1).map(loc => encodeURIComponent(loc)).join('|');
            url += `&waypoints=${waypoints}`;
        }

        window.open(url, '_blank');
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        // Dropped outside a valid droppable
        if (!destination) return;

        // No movement
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return;
        }

        const sourceColIdx = parseInt(source.droppableId.split('-')[1]);
        const destColIdx = parseInt(destination.droppableId.split('-')[1]);

        const newAgendas = [...localAgendas];
        const sourceCol = [...newAgendas[sourceColIdx]];
        const destCol = sourceColIdx === destColIdx ? sourceCol : [...newAgendas[destColIdx]];

        // Disconnect item
        const [movedItem] = sourceCol.splice(source.index, 1);
        movedItem["Assigned Agent"] = destColIdx; // Update metadata

        // Inject item
        destCol.splice(destination.index, 0, movedItem);

        newAgendas[sourceColIdx] = sourceCol;
        if (sourceColIdx !== destColIdx) {
            newAgendas[destColIdx] = destCol;
        }

        // Temporal: To sort them by start time automatically upon drop:
        // Normally you'd translate '10:00 AM' into minutes and sort newAgendas[destColIdx] here
        // For visual simplicity, we just inject it exactly where the user dropped it.

        setLocalAgendas(newAgendas);
    };

    return (
        <div className="glass-panel w-full h-full p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <h2 className="text-2xl font-bold">Optimización de Agenda de Equipo</h2>
                <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm">
                    Austin, TX
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-6">
                {isBrowser ? (
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="grid grid-cols-4 gap-4">
                            {localAgendas.map((agentEvents, i) => (
                                <Droppable droppableId={`col-${i}`} key={`col-${i}`}>
                                    {(provided: any, snapshot: any) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            className={`flex flex-col space-y-4 rounded-xl transition-colors ${snapshot.isDraggingOver ? 'bg-white/5' : ''}`}
                                        >
                                            <div className={`sticky top-0 p-3 rounded-lg bg-panel-dark border border-panel-border z-10 font-bold ${textColors[i]}`}>
                                                <div className="flex justify-between items-center">
                                                    <span>Persona {i + 1}</span>
                                                    {agentEvents.length > 0 && (
                                                        <div className="flex space-x-1.5">
                                                            <button onClick={() => handleExportMap(i)} title="Ver Ruta Diaria (Google Maps)" className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 active:bg-white/20 transition-all border border-transparent hover:border-white/10">
                                                                <Map size={14} className="text-white opacity-90" />
                                                            </button>
                                                            <button onClick={() => handleExportICS(i)} title="Añadir a Calendario (.ICS)" className="p-1.5 rounded-md bg-white/5 hover:bg-white/10 active:bg-white/20 transition-all border border-transparent hover:border-white/10">
                                                                <Download size={14} className="text-white opacity-90" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="relative border-l border-panel-border/30 pl-4 py-4 space-y-6 min-h-[100px]">
                                                {agentEvents.map((evt, j) => (
                                                    <Draggable draggableId={`item-${i}-${j}-${evt["Start Time"]}`} index={j} key={`item-${i}-${j}-${evt["Start Time"]}`}>
                                                        {(dragProvided: any, dragSnapshot: any) => (
                                                            <div
                                                                ref={dragProvided.innerRef}
                                                                {...dragProvided.draggableProps}
                                                                {...dragProvided.dragHandleProps}
                                                                className={`p-4 rounded-xl border bg-gradient-to-br ${colors[i]} backdrop-blur-md transition-shadow ${dragSnapshot.isDragging ? 'shadow-2xl shadow-brand-cyan/20 ring-2 ring-brand-cyan z-50' : 'shadow-lg'}`}
                                                                style={{ ...dragProvided.draggableProps.style }}
                                                            >
                                                                <div className="flex justify-between items-start mb-1">
                                                                    <p className="text-xs text-gray-300 font-medium">{evt["Start Time"]} - {evt["End Time"]}</p>
                                                                    <svg className="w-3 h-3 text-white/30 cursor-grab active:cursor-grabbing" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                                                                </div>
                                                                <h4 className="font-semibold text-white mb-2">{evt["Event Name"]}</h4>
                                                                <p className="text-sm text-gray-400 mb-4">{evt["Location"]}</p>

                                                                {evt["Backup Event"] && (
                                                                    <div className="mt-2 text-xs border border-yellow-500/20 bg-yellow-500/10 rounded-lg p-2 mb-4 pointer-events-none">
                                                                        <div className="flex items-center text-yellow-400 font-semibold mb-1">
                                                                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                                                            Plan B (Backup)
                                                                        </div>
                                                                        <p className="text-white truncate">{evt["Backup Event"]["Event Name"]}</p>
                                                                        <p className="text-gray-400 truncate">{evt["Backup Event"]["Location"]}</p>
                                                                    </div>
                                                                )}

                                                                {evt["Walking Time To Next"] > 0 && j < agentEvents.length - 1 && !dragSnapshot.isDragging && (
                                                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/5 text-xs pointer-events-none">
                                                                        <svg className="w-3 h-3 mr-1.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                                                        {evt["Walking Time To Next"]} min desc. / caminata
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </div>
                    </DragDropContext>
                ) : null}

                <div className="mt-8 border-t border-white/10 pt-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-100">Eventos sin asignar (Agendas CIX Llenas)</h3>
                    {unassignedEvents && unassignedEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {unassignedEvents.map((evt, j) => (
                                <div key={`u-${j}`} className="p-4 rounded-xl border border-red-500/30 bg-red-500/5 opacity-90 backdrop-blur-md">
                                    <p className="text-xs text-red-300 mb-1">{evt["Start Time"]} - {evt["End Time"]}</p>
                                    <h4 className="font-semibold text-white mb-2">{evt["Event Name"]}</h4>
                                    <p className="text-sm text-gray-400">{evt["Location"]}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-green-400">
                            Todos los eventos de este día pudieron ser asignados exitosamente a las 4 personas. ¡Excelente optimización!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
