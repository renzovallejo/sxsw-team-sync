import React from 'react';
import { PAPER, INK, INK_2, INK_3, RULE } from '../tokens.js';
import { SignalImage, TipoTag, DisruptionMeter } from '../components/Atoms.jsx';

// Home screen — landing after onboarding, with news + quick actions
export default function HomeScreen({ signals, accent, typeSys, onCapture, onOpenSignal, onOpenFeed, onOpenMap, onOpenNotifications }) {
  if (!signals?.length) return (
    <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:12, color: INK_3, fontFamily: typeSys.body }}>
      <div style={{ fontSize: 32 }}>◎</div>
      <div style={{ fontFamily:'"JetBrains Mono",ui-monospace,monospace', fontSize:11, letterSpacing:1.4, textTransform:'uppercase' }}>Sin señales aún</div>
      <button onClick={() => onCapture?.('photo')} style={{ marginTop:8, padding:'10px 20px', background: INK, color: PAPER, border:'none', borderRadius:24, cursor:'pointer', fontSize:13 }}>Capturar la primera</button>
    </div>
  );
  const featured = signals[0];
  const recent = signals.slice(1, 4);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      overflow: 'auto', fontFamily: typeSys.body,
      paddingBottom: 90, // room for tab bar
    }}>
      <div style={{ padding: '60px 20px 10px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>
          <span>Jueves 17 · abril</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>Huancayo</span>
            <button onClick={onOpenNotifications} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              padding: 0, color: INK_2, position: 'relative',
              display: 'flex', alignItems: 'center',
            }} title="Notificaciones">
              <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path d="M8 1.5C5 1.5 3.5 3.5 3.5 6.5V9.5L2 12h12l-1.5-2.5V6.5c0-3-1.5-5-4.5-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                <path d="M6.5 14a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              <span style={{
                position: 'absolute', top: -2, right: -3,
                width: 7, height: 7, borderRadius: '50%',
                background: accent.hex, border: `1px solid ${PAPER}`,
              }}/>
            </button>
          </span>
        </div>
        <div style={{
          marginTop: 6,
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 40, lineHeight: 1, letterSpacing: -1.4,
        }}>Hola, Vera.</div>
        <div style={{
          marginTop: 6, fontSize: 14, color: INK_2, lineHeight: 1.45,
        }}>¿Qué te llamó la atención hoy?</div>
      </div>

      {/* Primary capture CTA */}
      <div style={{ padding: '18px 20px 0' }}>
        <button onClick={() => onCapture('photo')} style={{
          width: '100%', padding: '22px', borderRadius: 0,
          background: INK, color: PAPER, border: 'none', cursor: 'pointer',
          display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center',
          gap: 12, textAlign: 'left',
        }}>
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, letterSpacing: 1.6, opacity: 0.6, textTransform: 'uppercase',
            }}>Captura rápida</div>
            <div style={{
              marginTop: 4,
              fontFamily: typeSys.display,
              fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
              fontWeight: typeSys.displayWeight,
              fontSize: 22, letterSpacing: -0.4, color: PAPER,
            }}>Registrar una señal</div>
          </div>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: accent.hex,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 20,
          }}>+</div>
        </button>
      </div>

      {/* Today's dispatch */}
      <div style={{ padding: '28px 20px 0' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>Despacho del día</span>
          <span onClick={onOpenFeed} style={{ color: accent.hex, cursor: 'pointer' }}>ver todo →</span>
        </div>
        <div onClick={() => onOpenSignal(featured)} style={{
          marginTop: 10, cursor: 'pointer',
          border: `1px solid ${RULE}`,
        }}>
          <SignalImage kind={featured.imagen}/>
          <div style={{ padding: '14px 14px 16px' }}>
            <TipoTag tipo={featured.tipo} accent={accent.hex}/>
            <div style={{
              marginTop: 6,
              fontFamily: typeSys.display,
              fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
              fontWeight: typeSys.displayWeight,
              fontSize: 22, lineHeight: 1.05, letterSpacing: -0.5,
            }}>{featured.titulo}</div>
            <div style={{
              marginTop: 6, fontSize: 13, color: INK_2, lineHeight: 1.4,
              display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>{featured.descripcion}</div>
            <div style={{
              marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 9, color: INK_3, letterSpacing: 1,
            }}>
              <span>@{featured.autor} · {featured.fecha}</span>
              <DisruptionMeter level={featured.disrupcion} accent={accent.hex}/>
            </div>
          </div>
        </div>
      </div>

      {/* Repositorio CTA */}
      <div style={{ padding: '24px 20px 20px' }}>
        <button onClick={onOpenFeed} style={{
          width: '100%', padding: '14px 16px',
          background: 'transparent', border: `1px solid ${INK}`, cursor: 'pointer',
          display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 12,
          textAlign: 'left',
        }}>
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
            }}>Repositorio público</div>
            <div style={{
              marginTop: 2,
              fontFamily: typeSys.display,
              fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
              fontWeight: typeSys.displayWeight,
              fontSize: 18, letterSpacing: -0.4, color: INK,
            }}>Explorar todas las señales →</div>
          </div>
          <span style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11, color: accent.hex, letterSpacing: 1,
          }}>156</span>
        </button>
        <button onClick={onOpenMap} style={{
          marginTop: 8, width: '100%', padding: '12px',
          background: 'transparent', border: `1px dashed ${RULE}`, cursor: 'pointer',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11, letterSpacing: 1.4, color: INK_2, textTransform: 'uppercase',
        }}>◉ Ver en el mapa</button>
      </div>
    </div>
  );
}

// Bottom tab bar — 5 tabs: Inicio · Social · Cargar · Futuros · Perfil
export function TabBar({ active, onTab, onCaptureSheet, accent, typeSys }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 40,
      paddingBottom: 24, paddingTop: 6,
      background: `${PAPER}ee`,
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: `1px solid ${RULE}`,
      display: 'grid', gridTemplateColumns: '1fr 1fr auto 1fr 1fr',
      alignItems: 'center',
      fontFamily: typeSys.body,
    }}>
      <button onClick={() => onTab('home')} style={tabStyle(active === 'home')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: active === 'home' ? INK : INK_3 }}>
          <path d="M3 10l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H4a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
        <span style={tabLabel(active === 'home')}>Inicio</span>
      </button>
      <button onClick={() => onTab('social')} style={tabStyle(active === 'social')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: active === 'social' ? INK : INK_3 }}>
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 11h16M11 3c2.5 3 2.5 13 0 16M11 3c-2.5 3-2.5 13 0 16" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
        <span style={tabLabel(active === 'social')}>Social</span>
      </button>

      {/* center capture sheet trigger */}
      <button onClick={onCaptureSheet} style={{
        width: 56, height: 56, borderRadius: 28,
        background: INK, color: PAPER,
        border: 'none', cursor: 'pointer', padding: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 8px',
        boxShadow: `0 8px 20px rgba(20,17,15,0.25), 0 0 0 4px ${PAPER}`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 6, borderRadius: '50%',
          border: `1.5px solid ${accent.hex}`,
        }}/>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      <button onClick={() => onTab('futuros')} style={tabStyle(active === 'futuros')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: active === 'futuros' ? INK : INK_3 }}>
          <circle cx="11" cy="11" r="3" fill="currentColor"/>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
          <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 3" opacity="0.6"/>
        </svg>
        <span style={tabLabel(active === 'futuros')}>Futuros</span>
      </button>

      <button onClick={() => onTab('profile')} style={tabStyle(active === 'profile')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: active === 'profile' ? INK : INK_3 }}>
          <circle cx="11" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M3 20c1-4 5-6 8-6s7 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span style={tabLabel(active === 'profile')}>Perfil</span>
      </button>
    </div>
  );
}

function tabStyle(active) {
  return {
    background: 'transparent', border: 'none', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
    padding: '6px 0',
    color: active ? INK : INK_3,
  };
}
function tabLabel(active) {
  return {
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    fontSize: 9, letterSpacing: 1.2, textTransform: 'uppercase',
    color: active ? INK : INK_3,
  };
}

// Capture mode sheet — modal that slides up with 3 options
export function CaptureSheet({ accent, typeSys, onPick, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(20,17,15,0.42)',
      backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeUp 200ms ease-out both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: PAPER,
        padding: '18px 20px 34px',
        borderRadius: '24px 24px 0 0',
        boxShadow: '0 -20px 40px rgba(0,0,0,0.2)',
        animation: 'fadeUp 280ms ease-out both',
        fontFamily: typeSys.body,
      }}>
        {/* handle */}
        <div style={{
          width: 40, height: 4, background: RULE, borderRadius: 2,
          margin: '0 auto 14px',
        }}/>
        <div style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>Cargar señal</div>
        <div style={{
          marginTop: 4,
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 26, lineHeight: 1, letterSpacing: -0.7,
        }}>¿Cómo la capturaste?</div>

        <div style={{
          marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10,
        }}>
          {/* Primary: Foto */}
          <button onClick={() => onPick('photo')} style={{
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'center',
            padding: '20px 18px',
            background: INK, color: PAPER,
            border: 'none', cursor: 'pointer', textAlign: 'left',
          }}>
            <div>
              <div style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 9, letterSpacing: 1.6, opacity: 0.55, textTransform: 'uppercase',
              }}>Recomendado</div>
              <div style={{
                marginTop: 3,
                fontFamily: typeSys.display,
                fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                fontWeight: typeSys.displayWeight,
                fontSize: 22, letterSpacing: -0.5, color: PAPER,
              }}>Foto</div>
              <div style={{ marginTop: 4, fontSize: 12, opacity: 0.65 }}>
                Un destello y ya. La forma más rápida.
              </div>
            </div>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: accent.hex,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
            }}>
              <svg width="22" height="20" viewBox="0 0 24 22" fill="none">
                <rect x="1.5" y="4" width="21" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 4l1.5-2.5h5L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          </button>

          {/* Secondary: Voz + Nota side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { k: 'voice', label: 'Voz', hint: 'Habla 3 seg.',
                icon: (
                  <svg width="18" height="20" viewBox="0 0 22 24" fill="none">
                    <rect x="7" y="2" width="8" height="12" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3 12a8 8 0 0016 0M11 20v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )
              },
              { k: 'text', label: 'Nota', hint: 'Una frase suelta.',
                icon: (
                  <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
                    <path d="M3 17l5-1 10-10-4-4L4 12l-1 5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                )
              },
            ].map(o => (
              <button key={o.k} onClick={() => onPick(o.k)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
                padding: '14px 14px',
                background: 'transparent', border: `1px solid ${RULE}`,
                cursor: 'pointer', textAlign: 'left',
                color: INK,
              }}>
                <div style={{ color: accent.hex }}>{o.icon}</div>
                <div>
                  <div style={{
                    fontFamily: typeSys.display,
                    fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                    fontWeight: typeSys.displayWeight,
                    fontSize: 16, letterSpacing: -0.3, color: INK,
                  }}>{o.label}</div>
                  <div style={{ marginTop: 1, fontSize: 11, color: INK_2 }}>{o.hint}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={onClose} style={{
          marginTop: 14, width: '100%', padding: '12px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
        }}>Cancelar</button>
      </div>
    </div>
  );
}
