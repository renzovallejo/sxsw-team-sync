import React, { useState } from 'react';
import { PAPER, PAPER_DEEP, INK, INK_2, INK_3, RULE, TIPO_META } from '../tokens.js';
import { SignalImage, TipoTag, DisruptionMeter, Rule } from '../components/Atoms.jsx';

// Feed screen — public repository of signals, with filter chips
// view: 'list' (editorial) | 'grid' (visual mosaic) | 'mapa' (geo)
export default function FeedScreen({ signals, accent, typeSys, onOpen, feedLayout = 'list' }) {
  const [filter, setFilter] = useState('todas');
  const [view, setView] = useState(feedLayout === 'grid' ? 'grid' : 'list');
  const filtered = filter === 'todas' ? signals : signals.filter(s => s.tipo === filter);

  const chips = [
    { k: 'todas', label: 'Todas', count: signals.length },
    { k: 'tecnologico', label: '◐ Tec', count: signals.filter(s=>s.tipo==='tecnologico').length },
    { k: 'social', label: '◑ Social', count: signals.filter(s=>s.tipo==='social').length },
    { k: 'especulativo', label: '◒ Fic', count: signals.filter(s=>s.tipo==='especulativo').length },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      overflow: 'auto', fontFamily: typeSys.body,
    }}>
      {/* masthead */}
      <div style={{ padding: '60px 20px 12px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>
          <span>Repositorio público</span>
          <span>Vol. 04 · ABR 2026</span>
        </div>
        <div style={{
          marginTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        }}>
          <div style={{
            fontFamily: typeSys.display,
            fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
            fontWeight: typeSys.displayWeight,
            fontSize: 42, letterSpacing: -1.4, lineHeight: 1,
          }}>
            Señales
          </div>
          <span style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11, color: INK_3,
          }}>
            {signals.length} capturas
          </span>
        </div>
      </div>

      <Rule/>

      {/* view toggle */}
      <div style={{
        display: 'flex', padding: '10px 20px 0',
      }}>
        <div style={{ display: 'flex', border: `1px solid ${RULE}`, flex: 1 }}>
          {[
            { k: 'list', label: 'Lista' },
            { k: 'grid', label: 'Grid' },
            { k: 'mapa', label: 'Mapa' },
          ].map((v, i) => (
            <button key={v.k} onClick={() => setView(v.k)} style={{
              flex: 1, padding: '8px 0',
              background: view === v.k ? INK : 'transparent',
              color: view === v.k ? PAPER : INK_2,
              border: 'none',
              borderLeft: i !== 0 ? `1px solid ${RULE}` : 'none',
              cursor: 'pointer',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase',
            }}>{v.label}</button>
          ))}
        </div>
      </div>

      {/* filter chips */}
      <div style={{
        display: 'flex', gap: 6, padding: '12px 20px',
        overflowX: 'auto',
      }}>
        {chips.map(c => {
          const active = c.k === filter;
          return (
            <button key={c.k} onClick={() => setFilter(c.k)} style={{
              flexShrink: 0,
              padding: '8px 12px',
              background: active ? INK : 'transparent',
              color: active ? PAPER : INK_2,
              border: `1px solid ${active ? INK : RULE}`,
              borderRadius: 100,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 11, letterSpacing: 0.5,
              cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {c.label}
              <span style={{
                opacity: 0.55,
                fontSize: 10,
              }}>{c.count}</span>
            </button>
          );
        })}
      </div>

      <Rule/>

      {/* grid variant */}
      {view === 'grid' && (
        <div style={{
          padding: '14px 16px 90px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14,
        }}>
          {filtered.map((s) => (
            <div key={s.id} onClick={() => onOpen?.(s)} style={{ cursor: 'pointer' }}>
              <div style={{ position: 'relative' }}>
                <SignalImage kind={s.imagen}/>
                <div style={{
                  position: 'absolute', top: 6, left: 6,
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 8, letterSpacing: 1.2, color: '#fff',
                  background: accent.hex, padding: '3px 6px',
                }}>{s.id}</div>
                <div style={{
                  position: 'absolute', bottom: 6, right: 6,
                  padding: '3px 6px', background: 'rgba(20,17,15,0.75)',
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 9, color: '#fff', letterSpacing: 0.8,
                }}>
                  {TIPO_META[s.tipo].glifo} {TIPO_META[s.tipo].short}
                </div>
              </div>
              <div style={{
                marginTop: 8,
                fontFamily: typeSys.display,
                fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                fontWeight: typeSys.displayWeight,
                fontSize: 15, lineHeight: 1.1, letterSpacing: -0.3, color: INK,
              }}>{s.titulo}</div>
              <div style={{
                marginTop: 4,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 9, color: INK_3, letterSpacing: 1,
                }}>@{s.autor}</span>
                <DisruptionMeter level={s.disrupcion} accent={accent.hex}/>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* list */}
      {view === 'list' && <div style={{ padding: '0 20px 90px' }}>
        {filtered.map((s, i) => (
          <div key={s.id}
            onClick={() => onOpen?.(s)}
            style={{
              display: 'grid',
              gridTemplateColumns: '88px 1fr',
              gap: 14,
              padding: '16px 0',
              borderBottom: i === filtered.length - 1 ? 'none' : `1px solid ${RULE}`,
              cursor: 'pointer',
            }}>
            <SignalImage kind={s.imagen} style={{ aspectRatio: '4/5' }}/>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 9, letterSpacing: 1.2, color: INK_3,
                textTransform: 'uppercase',
              }}>
                <span>{s.id} · @{s.autor}</span>
                <span>{s.fecha}</span>
              </div>
              <div style={{
                marginTop: 4,
                fontFamily: typeSys.display,
                fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                fontWeight: typeSys.displayWeight,
                fontSize: 20, lineHeight: 1.05, letterSpacing: -0.5,
                color: INK, textWrap: 'pretty',
              }}>
                {s.titulo}
              </div>
              <div style={{
                marginTop: 6, fontSize: 12, lineHeight: 1.4, color: INK_2,
                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {s.descripcion}
              </div>
              <div style={{
                marginTop: 'auto', paddingTop: 8,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <TipoTag tipo={s.tipo} small accent={accent.hex}/>
                <DisruptionMeter level={s.disrupcion} accent={accent.hex}/>
              </div>
            </div>
          </div>
        ))}
      </div>}

      {/* mapa */}
      {view === 'mapa' && <FeedMapView signals={filtered} accent={accent} typeSys={typeSys} onOpen={onOpen}/>}

      {/* floating capture FAB */}
      <div style={{
        position: 'sticky', bottom: 24, display: 'flex', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <button style={{
          pointerEvents: 'auto',
          height: 48, padding: '0 18px', borderRadius: 24,
          background: INK, color: PAPER,
          border: 'none', cursor: 'pointer',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: 8,
          boxShadow: '0 8px 24px rgba(20,17,15,0.25)',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: accent.hex,
          }}/>
          Capturar señal
        </button>
      </div>
    </div>
  );
}

// Inline map view inside Feed (replaces standalone Map screen)
function FeedMapView({ signals, accent, typeSys, onOpen }) {
  const positions = {
    's-042': { x: 42, y: 48, loc: 'Jr. Real' },
    's-041': { x: 58, y: 32, loc: 'El Tambo' },
    's-040': { x: 35, y: 62, loc: 'Parque Huamanmarca' },
    's-039': { x: 52, y: 68, loc: 'Chilca' },
    's-038': { x: 65, y: 55, loc: 'San Carlos' },
    's-037': { x: 28, y: 38, loc: 'Plaza Constitución' },
  };
  const [selected, setSelected] = useState(signals[0]);
  const visible = signals.filter(s => positions[s.id]);

  return (
    <div style={{
      margin: '14px 16px 90px',
      border: `1px solid ${RULE}`,
      position: 'relative', overflow: 'hidden',
      background: PAPER_DEEP,
      height: 420,
    }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <pattern id="feedgrid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M 22 0 L 0 0 0 22" fill="none" stroke={RULE} strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#feedgrid)"/>
        {[0.2, 0.4, 0.6].map((op, i) => (
          <ellipse key={i} cx="40%" cy="50%" rx={`${60 + i * 20}`} ry={`${85 + i * 25}`}
            fill="none" stroke={INK_3} strokeOpacity={0.12} strokeWidth="0.6"/>
        ))}
        <path d="M 0,160 Q 110,210 170,260 T 340,400"
          fill="none" stroke={INK_3} strokeOpacity={0.22} strokeWidth="5"/>
        <path d="M 0,160 Q 110,210 170,260 T 340,400"
          fill="none" stroke={PAPER} strokeOpacity={0.7} strokeWidth="2.5"/>
      </svg>

      <div style={{
        position: 'absolute', top: 10, left: 10,
        padding: '4px 8px', background: PAPER, border: `1px solid ${RULE}`,
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 9, color: INK_2, letterSpacing: 1.2, textTransform: 'uppercase',
        display: 'flex', gap: 5, alignItems: 'center',
      }}>
        <span style={{ color: accent.hex }}>◉</span> Huancayo · {visible.length}
      </div>

      <div style={{
        position: 'absolute', left: '22%', top: '20%',
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 8, color: INK_3, letterSpacing: 1, textTransform: 'uppercase',
        transform: 'rotate(-8deg)',
      }}>Carretera Central</div>

      {visible.map(s => {
        const p = positions[s.id];
        const active = selected?.id === s.id;
        return (
          <button key={s.id} onClick={() => setSelected(s)} style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            transform: 'translate(-50%, -50%)',
            width: active ? 40 : 30, height: active ? 40 : 30,
            borderRadius: '50%',
            background: active ? accent.hex : PAPER,
            border: `1.5px solid ${active ? accent.ink : INK}`,
            cursor: 'pointer', padding: 0,
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: active ? 10 : 9, color: active ? '#fff' : INK,
            fontWeight: 500,
            boxShadow: active ? `0 0 0 5px ${accent.hex}22, 0 3px 8px rgba(0,0,0,0.15)` : '0 1px 4px rgba(0,0,0,0.12)',
            transition: 'all 180ms',
            zIndex: active ? 5 : 2,
          }}>{s.id.replace('s-','')}</button>
        );
      })}

      {selected && (
        <div style={{
          position: 'absolute', bottom: 10, left: 10, right: 10,
          background: PAPER, border: `1px solid ${INK}`, padding: 12,
          boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 9, letterSpacing: 1.2, color: INK_3, textTransform: 'uppercase',
          }}>
            <span>{selected.id} · {positions[selected.id]?.loc}</span>
            <span>{selected.fecha}</span>
          </div>
          <div style={{
            marginTop: 4,
            fontFamily: typeSys.display,
            fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
            fontWeight: typeSys.displayWeight,
            fontSize: 18, lineHeight: 1, letterSpacing: -0.4,
          }}>{selected.titulo}</div>
          <div style={{
            marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <TipoTag tipo={selected.tipo} small accent={accent.hex}/>
              <DisruptionMeter level={selected.disrupcion} accent={accent.hex}/>
            </div>
            <button onClick={() => onOpen?.(selected)} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, letterSpacing: 1.2, color: INK, textTransform: 'uppercase', padding: 0,
            }}>abrir →</button>
          </div>
        </div>
      )}
    </div>
  );
}
