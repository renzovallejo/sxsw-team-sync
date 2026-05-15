import React, { useState } from 'react';
import { PAPER, PAPER_DEEP, INK, INK_2, INK_3, RULE } from '../tokens.js';
import { TipoTag, DisruptionMeter, Rule } from '../components/Atoms.jsx';

// Social screen — señales by region of Peru + hunter ranking
export default function SocialScreen({ signals, accent, typeSys, onOpen }) {
  const [tab, setTab] = useState('regiones'); // 'regiones' | 'cazadores'
  const [activeRegion, setActiveRegion] = useState('Junín');

  // Map of regions with sample signals + counts
  const regiones = [
    { nombre: 'Junín',     cap: 'Huancayo',   count: 23, x: 38, y: 52, hot: true },
    { nombre: 'Lima',      cap: 'Lima',       count: 41, x: 22, y: 58 },
    { nombre: 'Cusco',     cap: 'Cusco',      count: 18, x: 56, y: 70 },
    { nombre: 'Arequipa',  cap: 'Arequipa',   count: 14, x: 48, y: 82 },
    { nombre: 'Loreto',    cap: 'Iquitos',    count: 9,  x: 64, y: 18 },
    { nombre: 'La Libertad', cap: 'Trujillo', count: 12, x: 28, y: 36 },
    { nombre: 'Puno',      cap: 'Puno',       count: 8,  x: 66, y: 80 },
    { nombre: 'Piura',     cap: 'Piura',      count: 11, x: 18, y: 22 },
  ];

  // Per-region sample señales (drawn from existing pool, re-tagged)
  const senalesPorRegion = {
    'Junín':       signals.slice(0, 3).map((s, i) => ({ ...s, ciudad: ['Huancayo','El Tambo','Chilca'][i] })),
    'Lima':        signals.slice(1, 4).map((s, i) => ({ ...s, ciudad: ['Miraflores','Barranco','Comas'][i] })),
    'Cusco':       signals.slice(2, 5).map((s, i) => ({ ...s, ciudad: ['Centro','San Blas','San Sebastián'][i] })),
    'Arequipa':    signals.slice(0, 2).map((s, i) => ({ ...s, ciudad: ['Cayma','Yanahuara'][i] })),
    'Loreto':      signals.slice(3, 5).map((s, i) => ({ ...s, ciudad: ['Iquitos','Belén'][i] })),
    'La Libertad': signals.slice(1, 3).map((s, i) => ({ ...s, ciudad: ['Trujillo','Huanchaco'][i] })),
    'Puno':        signals.slice(4, 5).map((s, i) => ({ ...s, ciudad: ['Puno'][i] })),
    'Piura':       signals.slice(0, 2).map((s, i) => ({ ...s, ciudad: ['Piura','Sullana'][i] })),
  };

  const cazadores = [
    { rank: 1, user: 'tomás.r',   region: 'Lima',      count: 47, disrup: 4.2, badge: '◆' },
    { rank: 2, user: 'ana.p',     region: 'Cusco',     count: 38, disrup: 3.8, badge: '◇' },
    { rank: 3, user: 'vera.m',    region: 'Junín',     count: 23, disrup: 3.4, badge: '◇', isYou: true },
    { rank: 4, user: 'marco.d',   region: 'Arequipa',  count: 21, disrup: 3.1 },
    { rank: 5, user: 'luisa.k',   region: 'La Libertad', count: 19, disrup: 2.9 },
    { rank: 6, user: 'diego.s',   region: 'Loreto',    count: 14, disrup: 3.6 },
    { rank: 7, user: 'rocío.h',   region: 'Piura',     count: 12, disrup: 2.4 },
    { rank: 8, user: 'kenji.l',   region: 'Puno',      count: 8,  disrup: 4.0 },
  ];

  const totalSenales = regiones.reduce((a, r) => a + r.count, 0);
  const senalesActivas = senalesPorRegion[activeRegion] || [];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      overflow: 'auto', fontFamily: typeSys.body,
      paddingBottom: 90,
    }}>
      <div style={{ padding: '60px 20px 8px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>
          <span>Comunidad</span>
          <span>{totalSenales} señales · 8 regiones</span>
        </div>
        <div style={{
          marginTop: 6,
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 36, lineHeight: 1, letterSpacing: -1.2,
        }}>El Perú,<br/>en señales.</div>
      </div>

      {/* Tabs */}
      <div style={{
        margin: '18px 20px 0', display: 'flex',
        border: `1px solid ${RULE}`,
      }}>
        {[
          { k: 'regiones', label: 'Regiones' },
          { k: 'clusters', label: 'Clusters' },
          { k: 'cazadores', label: 'Cazadores' },
        ].map((t, i) => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            flex: 1, padding: '12px 0',
            background: tab === t.k ? INK : 'transparent',
            color: tab === t.k ? PAPER : INK_2,
            border: 'none',
            borderLeft: i !== 0 ? `1px solid ${RULE}` : 'none',
            cursor: 'pointer',
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase',
          }}>{t.label}</button>
        ))}
      </div>

      {tab === 'regiones' && (
        <>
          {/* Stylized Peru map */}
          <div style={{
            margin: '18px 20px 0', position: 'relative',
            height: 260, border: `1px solid ${RULE}`, background: PAPER_DEEP,
            overflow: 'hidden',
          }}>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <defs>
                <pattern id="sgrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke={RULE} strokeWidth="0.4"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sgrid)"/>
              {/* abstract Peru silhouette */}
              <path d="M 60,30 Q 90,20 130,40 L 170,80 Q 200,140 220,200 Q 230,240 200,260 L 140,260 Q 100,250 80,210 Q 50,170 50,120 Q 50,70 60,30 Z"
                fill={`${INK}08`} stroke={INK_3} strokeOpacity="0.4" strokeWidth="0.7"/>
              {/* coastline accent */}
              <path d="M 50,80 Q 40,140 60,210 Q 70,250 90,260"
                fill="none" stroke={accent.hex} strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="2 3"/>
            </svg>
            {/* labels */}
            <div style={{
              position: 'absolute', left: 10, top: 8,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 9, color: INK_3, letterSpacing: 1.2, textTransform: 'uppercase',
            }}>↑ N · Pacífico ←</div>
            <div style={{
              position: 'absolute', right: 10, bottom: 8,
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 9, color: INK_3, letterSpacing: 1.2, textTransform: 'uppercase',
            }}>Selva →</div>

            {/* region pins */}
            {regiones.map(r => {
              const active = activeRegion === r.nombre;
              const size = Math.max(18, Math.min(40, 16 + r.count * 0.6));
              return (
                <button key={r.nombre} onClick={() => setActiveRegion(r.nombre)} style={{
                  position: 'absolute',
                  left: `${r.x}%`, top: `${r.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: size, height: size, borderRadius: '50%',
                  background: active ? accent.hex : `${accent.hex}30`,
                  border: `1.5px solid ${active ? accent.ink : accent.hex}`,
                  cursor: 'pointer', padding: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10, fontWeight: 500,
                  color: active ? '#fff' : accent.ink,
                  boxShadow: active ? `0 0 0 6px ${accent.hex}22` : 'none',
                  transition: 'all 200ms',
                  zIndex: active ? 5 : 2,
                }}>{r.count}</button>
              );
            })}
          </div>

          {/* Region detail */}
          <div style={{ padding: '20px 20px 0' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            }}>
              <div>
                <div style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
                }}>Región seleccionada</div>
                <div style={{
                  marginTop: 2,
                  fontFamily: typeSys.display,
                  fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                  fontWeight: typeSys.displayWeight,
                  fontSize: 28, lineHeight: 1, letterSpacing: -0.8,
                }}>{activeRegion}.</div>
              </div>
              <div style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 11, color: accent.hex, letterSpacing: 1,
              }}>
                {regiones.find(r => r.nombre === activeRegion)?.count || 0} señales
              </div>
            </div>

            {/* horizontal scroll of region quick-pills */}
            <div style={{ marginTop: 14, display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
              {regiones.map(r => (
                <button key={r.nombre} onClick={() => setActiveRegion(r.nombre)} style={{
                  flexShrink: 0, padding: '6px 11px', borderRadius: 100,
                  background: activeRegion === r.nombre ? INK : 'transparent',
                  color: activeRegion === r.nombre ? PAPER : INK_2,
                  border: `1px solid ${activeRegion === r.nombre ? INK : RULE}`,
                  cursor: 'pointer',
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10, letterSpacing: 1, textTransform: 'uppercase',
                }}>{r.nombre} · {r.count}</button>
              ))}
            </div>

            {/* signals list for region */}
            <div style={{ marginTop: 14 }}>
              {senalesActivas.map((s, i) => (
                <div key={s.id + i} onClick={() => onOpen?.(s)} style={{
                  padding: '14px 0',
                  borderBottom: i === senalesActivas.length - 1 ? 'none' : `1px solid ${RULE}`,
                  cursor: 'pointer',
                  display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 12, alignItems: 'center',
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: PAPER_DEEP, border: `1px solid ${INK_3}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: 9, color: INK, fontWeight: 500,
                  }}>{s.id.replace('s-','')}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontFamily: typeSys.display,
                      fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                      fontSize: 16, lineHeight: 1.1, letterSpacing: -0.3,
                    }}>{s.titulo}</div>
                    <div style={{
                      marginTop: 4, display: 'flex', gap: 8, alignItems: 'center',
                      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                      fontSize: 9, color: INK_3, letterSpacing: 1,
                    }}>
                      <span>◉ {s.ciudad}</span>
                      <span>·</span>
                      <span>@{s.autor}</span>
                    </div>
                  </div>
                  <DisruptionMeter level={s.disrupcion} accent={accent.hex}/>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'clusters' && (
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
            marginBottom: 8,
          }}>Patrones emergentes del repositorio</div>
          <div style={{
            fontSize: 13, lineHeight: 1.45, color: INK_2, marginBottom: 18,
          }}>
            Cuando varias señales conversan, forman un cluster. Aquí los que están creciendo.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { n: '23', label: 'Clima como mercancía', t: 'social', growth: '+8 esta semana',
                desc: 'Sombra, aire y temperatura como bienes tarifables.' },
              { n: '17', label: 'Reparación ritual', t: 'social', growth: '+5',
                desc: 'Talleres comunitarios contra la obsolescencia programada.' },
              { n: '11', label: 'Duelo algorítmico', t: 'especulativo', growth: '+3',
                desc: 'IA generativa al servicio de la memoria familiar.' },
              { n: '08', label: 'Energía de bolsillo', t: 'tecnologico', growth: '+2',
                desc: 'Infraestructura off-grid portátil y desplegable.' },
            ].map((c, i) => (
              <div key={i} style={{
                padding: '14px', border: `1px solid ${RULE}`, cursor: 'pointer',
                display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14,
              }}>
                <div style={{
                  fontFamily: typeSys.display,
                  fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                  fontWeight: typeSys.displayWeight,
                  fontSize: 36, color: accent.hex, lineHeight: 1, letterSpacing: -1,
                }}>{c.n}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: typeSys.display,
                    fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                    fontWeight: typeSys.displayWeight,
                    fontSize: 17, letterSpacing: -0.4, color: INK, lineHeight: 1.1,
                  }}>{c.label}</div>
                  <div style={{ marginTop: 4, fontSize: 12, color: INK_2, lineHeight: 1.4 }}>
                    {c.desc}
                  </div>
                  <div style={{
                    marginTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <TipoTag tipo={c.t} small accent={accent.hex}/>
                    <span style={{
                      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                      fontSize: 9, color: accent.hex, letterSpacing: 1,
                    }}>↗ {c.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'cazadores' && (
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
            marginBottom: 10,
          }}>Top del mes · abril 2026</div>

          {/* podium for top 3 */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr',
            gap: 8, alignItems: 'end', marginBottom: 18,
          }}>
            {[cazadores[1], cazadores[0], cazadores[2]].map((c, i) => {
              const heights = [80, 110, 64];
              return (
                <div key={c.user} style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    margin: '0 auto 8px',
                    background: c.isYou ? accent.hex : `linear-gradient(135deg, ${INK}, ${INK_2})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: typeSys.display,
                    fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                    fontSize: 22, color: '#fff', fontWeight: 500,
                  }}>{c.user[0]}</div>
                  <div style={{
                    fontFamily: typeSys.display,
                    fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                    fontSize: 14, color: INK,
                  }}>@{c.user}</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: 9, color: INK_3, letterSpacing: 0.8,
                  }}>{c.region}</div>
                  <div style={{
                    marginTop: 6,
                    height: heights[i],
                    background: i === 1 ? INK : PAPER_DEEP,
                    border: `1px solid ${i === 1 ? INK : RULE}`,
                    color: i === 1 ? PAPER : INK,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    padding: '4px',
                  }}>
                    <div style={{
                      fontFamily: typeSys.display,
                      fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                      fontSize: 22, letterSpacing: -0.6, lineHeight: 1,
                    }}>{c.count}</div>
                    <div style={{
                      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                      fontSize: 8, letterSpacing: 1.2, opacity: 0.7,
                      marginTop: 2,
                    }}>#{c.rank}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <Rule/>

          {/* full ranking */}
          <div style={{ marginTop: 10 }}>
            {cazadores.map((c, i) => (
              <div key={c.user} style={{
                padding: '12px 0',
                borderBottom: i === cazadores.length - 1 ? 'none' : `1px solid ${RULE}`,
                background: c.isYou ? `${accent.hex}10` : 'transparent',
                marginLeft: c.isYou ? -20 : 0,
                marginRight: c.isYou ? -20 : 0,
                paddingLeft: c.isYou ? 20 : 0,
                paddingRight: c.isYou ? 20 : 0,
                display: 'grid', gridTemplateColumns: '32px auto 1fr auto', gap: 12, alignItems: 'center',
              }}>
                <div style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 14, color: c.rank <= 3 ? accent.hex : INK_3,
                  fontWeight: 500, letterSpacing: 0.5,
                }}>{String(c.rank).padStart(2, '0')}</div>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: c.isYou ? accent.hex : PAPER_DEEP,
                  border: `1px solid ${c.isYou ? accent.ink : RULE}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: typeSys.display,
                  fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                  fontSize: 16, color: c.isYou ? '#fff' : INK, fontWeight: 500,
                }}>{c.user[0]}</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: typeSys.display,
                    fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                    fontSize: 15, letterSpacing: -0.3,
                  }}>
                    @{c.user}
                    {c.isYou && (
                      <span style={{
                        marginLeft: 6, padding: '1px 6px',
                        background: accent.hex, color: '#fff',
                        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                        fontSize: 8, letterSpacing: 1.2, textTransform: 'uppercase',
                        verticalAlign: 'middle',
                      }}>tú</span>
                    )}
                    {c.badge && (
                      <span style={{ marginLeft: 6, color: accent.hex, fontSize: 12 }}>{c.badge}</span>
                    )}
                  </div>
                  <div style={{
                    marginTop: 2,
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: 9, color: INK_3, letterSpacing: 1,
                  }}>◉ {c.region}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: typeSys.display,
                    fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                    fontSize: 18, letterSpacing: -0.4, lineHeight: 1,
                  }}>{c.count}</div>
                  <div style={{
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: 8, color: INK_3, letterSpacing: 1, marginTop: 2,
                  }}>disrup. {c.disrup.toFixed(1)}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 18, padding: 12,
            border: `1px dashed ${RULE}`, textAlign: 'center',
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
            }}>Insignia próxima</div>
            <div style={{
              marginTop: 4,
              fontFamily: typeSys.display,
              fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
              fontSize: 16, color: INK,
            }}>◆ Cartógrafa · 30 señales</div>
            <div style={{ marginTop: 6, fontSize: 12, color: INK_2 }}>
              Te faltan 7 señales para subir.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
