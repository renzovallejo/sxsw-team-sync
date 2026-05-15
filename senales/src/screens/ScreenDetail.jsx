import React, { useState } from 'react';
import { PAPER, PAPER_DEEP, INK, INK_2, INK_3, RULE, SAMPLE_SIGNALS } from '../tokens.js';
import { TipoTag, DisruptionMeter, Rule } from '../components/Atoms.jsx';

// Detail screen — header + tabs (Análisis · Resonancia · Datos)
export default function DetailScreen({ signal, accent, typeSys, onBack, onOpen }) {
  const [tab, setTab] = useState('analisis');
  const [openLens, setOpenLens] = useState('tecnologico');
  const [favorited, setFavorited] = useState(signal.id === 's-042');

  const jsonPayload = {
    titulo_senal: signal.titulo,
    descripcion_objetiva: signal.descripcion,
    analisis_perspectivas: signal.lentes || {},
    categorias_emergentes: signal.tags,
    escala_tiempo: `${signal.escala} plazo`,
    nivel_disrupcion: `${signal.disrupcion}/5`,
  };

  const lenses = [
    { k: 'tecnologico', icon: '◐', title: 'Lente tecnológico / económico',
      q: '¿Cómo escala y qué fricción estructural resuelve?',
      body: signal.lentes?.tecnologico },
    { k: 'social', icon: '◑', title: 'Lente social / humano',
      q: '¿Qué comportamiento cultural fomenta o qué dilema ético genera?',
      body: signal.lentes?.social },
    { k: 'especulativo', icon: '◒', title: 'Lente especulativo',
      q: 'Si fuese norma en 2036, ¿cómo luciría ese mundo?',
      body: signal.lentes?.especulativo },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      overflow: 'auto', fontFamily: typeSys.body,
    }}>
      {/* top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: `${PAPER}ee`, backdropFilter: 'blur(12px)',
        padding: '58px 20px 0',
        borderBottom: `1px solid ${RULE}`,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingBottom: 10,
        }}>
          <button onClick={onBack} style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11, letterSpacing: 1.4, color: INK_2, padding: 0,
          }}>← volver</button>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button onClick={() => setFavorited(!favorited)} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: 0, color: favorited ? accent.hex : INK_3,
              fontSize: 18, lineHeight: 1,
            }} title="Favorita">{favorited ? '★' : '☆'}</button>
            <span style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, letterSpacing: 1.4, color: INK_3,
            }}>{signal.id}</span>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0 }}>
          {[
            { k: 'analisis', label: 'Análisis' },
            { k: 'resonancia', label: 'Resonancia' },
            { k: 'datos', label: 'Datos' },
          ].map(t => {
            const on = tab === t.k;
            return (
              <button key={t.k} onClick={() => setTab(t.k)} style={{
                flex: 1, padding: '12px 0',
                background: 'transparent', border: 'none',
                borderBottom: `2px solid ${on ? INK : 'transparent'}`,
                cursor: 'pointer',
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase',
                color: on ? INK : INK_3,
              }}>{t.label}</button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '22px 24px 40px' }}>
        {/* HEADER — always visible */}
        <div style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>
          Capturada por @{signal.autor} · {signal.fecha}
        </div>
        <div style={{
          marginTop: 8,
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 32, lineHeight: 0.98, letterSpacing: -1.1,
          textWrap: 'pretty',
        }}>{signal.titulo}.</div>
        <div style={{
          marginTop: 10, fontSize: 14, lineHeight: 1.5, color: INK_2,
        }}>{signal.descripcion}</div>
        <div style={{
          marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center',
        }}>
          <TipoTag tipo={signal.tipo} accent={accent.hex}/>
          <span style={{ width: 1, height: 10, background: RULE }}/>
          <span style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 10, letterSpacing: 1.4, color: INK_3,
          }}>{signal.escala.toUpperCase()} PLAZO</span>
          <span style={{ width: 1, height: 10, background: RULE }}/>
          <DisruptionMeter level={signal.disrupcion} accent={accent.hex}/>
        </div>

        <Rule style={{ marginTop: 24 }}/>

        {/* ANÁLISIS TAB */}
        {tab === 'analisis' && (
          <>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {lenses.map(l => {
                const open = openLens === l.k;
                return (
                  <div key={l.k} style={{ borderTop: `1px solid ${RULE}` }}>
                    <button onClick={() => setOpenLens(open ? null : l.k)} style={{
                      width: '100%', padding: '16px 0',
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      textAlign: 'left',
                    }}>
                      <span style={{ fontSize: 22, color: open ? accent.hex : INK_2, lineHeight: 1 }}>{l.icon}</span>
                      <span style={{
                        flex: 1,
                        fontFamily: typeSys.display,
                        fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                        fontWeight: typeSys.displayWeight,
                        fontSize: 18, color: INK, letterSpacing: -0.3,
                      }}>{l.title}</span>
                      <span style={{
                        fontSize: 16, color: INK_3,
                        transform: open ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 200ms',
                      }}>+</span>
                    </button>
                    {open && (
                      <div style={{ paddingBottom: 22, paddingLeft: 36 }}>
                        <div style={{
                          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                          fontSize: 10, letterSpacing: 1.2, color: accent.hex,
                          marginBottom: 8, textTransform: 'uppercase',
                        }}>{l.q}</div>
                        <div style={{
                          fontSize: 15, lineHeight: 1.55, color: INK_2, textWrap: 'pretty',
                        }}>{l.body}</div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ borderTop: `1px solid ${RULE}` }}/>
            </div>

            {/* tags */}
            <div style={{
              marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 6,
            }}>
              {signal.tags && signal.tags.map(t => (
                <span key={t} style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10, letterSpacing: 0.8,
                  padding: '5px 9px',
                  border: `1px solid ${RULE}`,
                  color: INK_2,
                }}>#{t}</span>
              ))}
            </div>
          </>
        )}

        {/* RESONANCIA TAB */}
        {tab === 'resonancia' && (
          <DetailResonance signal={signal} accent={accent} typeSys={typeSys} onOpen={onOpen}/>
        )}

        {/* DATOS TAB */}
        {tab === 'datos' && (
          <div style={{ marginTop: 14 }}>
            <div style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
              marginBottom: 8,
            }}>{'{ '}payload_público.json{' }'}</div>
            <pre style={{
              padding: 14,
              background: INK, color: '#EDE4D3',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10.5, lineHeight: 1.55,
              overflow: 'auto', whiteSpace: 'pre-wrap', borderRadius: 0,
              margin: 0,
            }}>
{JSON.stringify(jsonPayload, null, 2)}
            </pre>
            <div style={{
              marginTop: 10,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, letterSpacing: 1, color: INK_3,
            }}>
              ↗ disponible en el repositorio público de Señales
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline resonance content for detail tab
function DetailResonance({ signal, accent, typeSys, onOpen }) {
  // pick 3 "related" — reuse SAMPLE_SIGNALS
  const others = SAMPLE_SIGNALS.filter(s => s.id !== signal.id).slice(0, 3);
  const cluster = 'Clima como mercancía';

  return (
    <div style={{ marginTop: 14 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
      }}>Hace eco con</div>
      <div style={{
        marginTop: 6,
        fontFamily: typeSys.display,
        fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
        fontWeight: typeSys.displayWeight,
        fontSize: 26, lineHeight: 1, letterSpacing: -0.8,
        color: INK,
      }}>{cluster}.</div>

      {/* constellation */}
      <div style={{
        marginTop: 16, position: 'relative',
        height: 140, border: `1px solid ${RULE}`,
        background: `repeating-linear-gradient(45deg, transparent 0 14px, ${RULE} 14px 14.5px)`,
      }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 38, height: 38, borderRadius: '50%',
          background: accent.hex, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, fontWeight: 500,
          boxShadow: `0 0 0 4px ${accent.hex}22`,
          zIndex: 2,
        }}>{signal.id.replace('s-','')}</div>
        {others.map((s, i) => {
          const angle = (i / others.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 30;
          const y = 50 + Math.sin(angle) * 35;
          return (
            <React.Fragment key={s.id}>
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <line x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`}
                  stroke={INK_3} strokeWidth="0.5" strokeDasharray="2 3"/>
              </svg>
              <button onClick={() => onOpen?.(s)} style={{
                position: 'absolute', left: `${x}%`, top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                width: 26, height: 26, borderRadius: '50%',
                background: PAPER, border: `1.5px solid ${INK}`,
                cursor: 'pointer', padding: 0,
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 8, color: INK, fontWeight: 500,
                zIndex: 2,
              }}>{s.id.replace('s-','')}</button>
            </React.Fragment>
          );
        })}
      </div>

      {/* related list */}
      <div style={{ marginTop: 16 }}>
        {others.map((s, i) => (
          <div key={s.id} onClick={() => onOpen?.(s)} style={{
            padding: '12px 0',
            borderBottom: i === others.length - 1 ? 'none' : `1px solid ${RULE}`,
            cursor: 'pointer',
            display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 12, alignItems: 'center',
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: '50%',
              background: PAPER_DEEP, border: `1px solid ${INK_3}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 9, color: INK, fontWeight: 500,
            }}>{s.id.replace('s-','')}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontFamily: typeSys.display,
                fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                fontWeight: typeSys.displayWeight,
                fontSize: 15, lineHeight: 1.15, letterSpacing: -0.3, color: INK,
              }}>{s.titulo}</div>
              <div style={{ marginTop: 3 }}>
                <TipoTag tipo={s.tipo} small accent={accent.hex}/>
              </div>
            </div>
            <span style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, color: accent.hex, letterSpacing: 1,
            }}>{Math.round(60 + Math.random() * 30)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
