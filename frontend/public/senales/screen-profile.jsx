// Profile / mis señales screen
function ProfileScreen({ signals, accent, typeSys, onOpen }) {
  const mine = signals.slice(0, 4); // pretend these are mine
  const byType = {
    tecnologico: mine.filter(s => s.tipo === 'tecnologico').length,
    social: mine.filter(s => s.tipo === 'social').length,
    especulativo: mine.filter(s => s.tipo === 'especulativo').length,
  };
  const avgDisrup = (mine.reduce((a, s) => a + s.disrupcion, 0) / mine.length).toFixed(1);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      overflow: 'auto', fontFamily: typeSys.body,
    }}>
      <div style={{ padding: '58px 20px 16px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>
          <span>Perfil</span>
          <span>Miembro desde 03·26</span>
        </div>

        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: `linear-gradient(135deg, ${accent.hex}, ${accent.ink})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: typeSys.display,
            fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
            fontSize: 28, color: '#fff', fontWeight: 500,
          }}>v</div>
          <div>
            <div style={{
              fontFamily: typeSys.display,
              fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
              fontWeight: typeSys.displayWeight,
              fontSize: 28, letterSpacing: -0.8, lineHeight: 1,
            }}>Vera Mendoza.</div>
            <div style={{
              marginTop: 4, fontSize: 13, color: INK_2,
            }}>@vera.m · Huancayo</div>
          </div>
        </div>
      </div>

      <Rule/>

      {/* stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        padding: '18px 20px',
      }}>
        {[
          { v: mine.length, l: 'señales' },
          { v: avgDisrup, l: 'disrupción prom.' },
          { v: '14', l: 'menciones' },
        ].map((s, i) => (
          <div key={i} style={{
            textAlign: i === 0 ? 'left' : i === 1 ? 'center' : 'right',
            borderLeft: i !== 0 ? `1px solid ${RULE}` : 'none',
          }}>
            <div style={{
              fontFamily: typeSys.display,
              fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
              fontWeight: typeSys.displayWeight,
              fontSize: 32, letterSpacing: -1, lineHeight: 1,
              color: INK,
            }}>{s.v}</div>
            <div style={{
              marginTop: 4,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 9, letterSpacing: 1.2, color: INK_3, textTransform: 'uppercase',
            }}>{s.l}</div>
          </div>
        ))}
      </div>

      <Rule/>

      {/* CURIOSITY MONITOR */}
      <div style={{ padding: '20px 20px 4px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>
          <span>Monitor de curiosidad</span>
          <span style={{ color: accent.hex }}>↗ +18 este mes</span>
        </div>

        {/* Index + level */}
        <div style={{
          marginTop: 12, display: 'grid', gridTemplateColumns: '1fr auto', gap: 16,
          alignItems: 'flex-end',
        }}>
          <div>
            <div style={{
              fontFamily: typeSys.display,
              fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
              fontWeight: typeSys.displayWeight,
              fontSize: 72, lineHeight: 0.85, letterSpacing: -3,
              color: INK,
            }}>64<span style={{
              color: INK_3, fontSize: 32, letterSpacing: -1,
            }}>/100</span></div>
            <div style={{
              marginTop: 6,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, letterSpacing: 1.4, color: INK_2, textTransform: 'uppercase',
            }}>Nivel · <span style={{ color: accent.hex }}>Exploradora</span></div>
          </div>
          {/* radial */}
          <div style={{
            width: 76, height: 76, position: 'relative',
          }}>
            <svg width="76" height="76" viewBox="0 0 76 76">
              <circle cx="38" cy="38" r="32" fill="none"
                stroke={RULE} strokeWidth="2"/>
              <circle cx="38" cy="38" r="32" fill="none"
                stroke={accent.hex} strokeWidth="2"
                strokeDasharray={`${64 * 2.01} 201`}
                strokeLinecap="square"
                transform="rotate(-90 38 38)"/>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 11, color: INK,
            }}>64%</div>
          </div>
        </div>

        {/* descriptor */}
        <div style={{
          marginTop: 10, fontSize: 13, lineHeight: 1.45, color: INK_2,
          textWrap: 'pretty',
        }}>
          Tu curiosidad crece cuando capturas en distintas <em>lentes</em>, en distintas <em>regiones</em>, y cuando los escenarios que generas te llevan a nuevas señales.
        </div>

        {/* Weekly activity sparkline */}
        <div style={{ marginTop: 18 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 9, letterSpacing: 1.2, color: INK_3, textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            <span>Actividad · últimas 12 semanas</span>
            <span>{`<-- antes`}&nbsp;&nbsp;{`hoy →`}</span>
          </div>
          <div style={{
            display: 'flex', gap: 4, alignItems: 'flex-end', height: 60,
          }}>
            {[1, 0, 2, 1, 2, 0, 3, 2, 4, 3, 5, 7].map((v, i, arr) => {
              const max = Math.max(...arr);
              const h = (v / max) * 100;
              const isLast = i === arr.length - 1;
              return (
                <div key={i} style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'flex-end', gap: 4,
                  height: '100%',
                }}>
                  <span style={{
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: 8, color: isLast ? accent.hex : 'transparent',
                  }}>{v}</span>
                  <div style={{
                    width: '100%', height: `${h}%`, minHeight: 2,
                    background: isLast ? accent.hex : v === 0 ? RULE : INK,
                    opacity: v === 0 ? 0.4 : 1,
                  }}/>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mini stat blocks */}
        <div style={{
          marginTop: 18,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
        }}>
          {[
            { v: '7', l: 'racha días', accent: true },
            { v: '12', l: 'futuros gen.' },
            { v: '0.74', l: 'diversidad' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: 10,
              border: `1px solid ${s.accent ? accent.hex : RULE}`,
              background: s.accent ? `${accent.hex}10` : 'transparent',
            }}>
              <div style={{
                fontFamily: typeSys.display,
                fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                fontSize: 26, letterSpacing: -0.6, lineHeight: 1,
                color: s.accent ? accent.hex : INK,
              }}>{s.v}</div>
              <div style={{
                marginTop: 4,
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 8, letterSpacing: 1, color: INK_3, textTransform: 'uppercase',
              }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Next milestone */}
        <div style={{
          marginTop: 14, padding: '12px 14px',
          border: `1px dashed ${RULE}`,
          display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 9, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
            }}>Próximo nivel</div>
            <div style={{
              marginTop: 2,
              fontFamily: typeSys.display,
              fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
              fontSize: 16, color: INK,
            }}>◆ Cartógrafa · 75</div>
            <div style={{ marginTop: 6, height: 3, background: RULE, position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0, width: '85%',
                background: accent.hex,
              }}/>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: typeSys.display,
              fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
              fontSize: 22, color: accent.hex, lineHeight: 1,
            }}>+11</div>
            <div style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 8, color: INK_3, letterSpacing: 1, marginTop: 2,
            }}>pts faltan</div>
          </div>
        </div>
      </div>

      <Rule style={{ marginTop: 20 }}/>

      {/* my signals list */}
      <div style={{ padding: '18px 20px 60px' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3,
          textTransform: 'uppercase', marginBottom: 10,
        }}>Mis últimas capturas</div>
        {mine.map((s, i) => (
          <div key={s.id} onClick={() => onOpen?.(s)} style={{
            padding: '12px 0',
            borderBottom: i === mine.length - 1 ? 'none' : `1px solid ${RULE}`,
            cursor: 'pointer',
            display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <div style={{
              width: 44, textAlign: 'center',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 20, color: accent.hex, fontWeight: 500,
            }}>{s.id.replace('s-', '')}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: typeSys.display,
                fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                fontWeight: typeSys.displayWeight,
                fontSize: 16, letterSpacing: -0.3, lineHeight: 1.15,
              }}>{s.titulo}</div>
              <div style={{
                marginTop: 4, display: 'flex', gap: 10, alignItems: 'center',
              }}>
                <TipoTag tipo={s.tipo} small accent={accent.hex}/>
                <span style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 9, color: INK_3, letterSpacing: 1,
                }}>{s.fecha}</span>
              </div>
            </div>
            <DisruptionMeter level={s.disrupcion} accent={accent.hex}/>
          </div>
        ))}
      </div>
    </div>
  );
}
window.ProfileScreen = ProfileScreen;
