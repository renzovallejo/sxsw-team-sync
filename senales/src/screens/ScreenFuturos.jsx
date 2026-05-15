import React, { useState } from 'react';
import { PAPER, PAPER_DEEP, INK, INK_2, INK_3, RULE } from '../tokens.js';
import { TipoTag, DisruptionMeter, Rule } from '../components/Atoms.jsx';

// Futuros — visual scenarios generated from user's favorite signals
export default function FuturosScreen({ signals, accent, typeSys, onOpenSignal, onRegenerate }) {
  const [activeFavSet, setActiveFavSet] = useState(0);

  // The user's "favoritas" — pretend these are saved
  const favoritas = signals.slice(0, 4);

  // Pre-baked generated scenarios — each draws from 2-3 favorite signals
  const escenarios = [
    {
      id: 'f-01',
      year: '2031',
      horizon: 'Cercano',
      titulo: 'Huancayo alquila su sombra',
      descripcion: 'En el Jr. Real la sombra se cotiza por minuto. Los paneles solares se intercambian en la feria dominical. La temperatura del valle del Mantaro se vuelve mercado.',
      bg: 'climate',
      sources: ['s-042', 's-040'],
      probability: 'Alta',
      disruption: 4,
    },
    {
      id: 'f-02',
      year: '2034',
      horizon: 'Medio',
      titulo: 'Los abuelos del Ande no callan',
      descripcion: 'Las voces clonadas en quechua y castellano custodian los puestos familiares en el mercado mayorista. El duelo se suscribe mensualmente como cualquier servicio en línea.',
      bg: 'ghost',
      sources: ['s-041'],
      probability: 'Media',
      disruption: 5,
    },
    {
      id: 'f-03',
      year: '2036',
      horizon: 'Medio',
      titulo: 'El barrio como república',
      descripcion: 'Cada cuadra de El Tambo y Chilca opera como una mini-república: alimenta sus mascotas, repara sus electrodomésticos y cultiva papas nativas en sus fachadas.',
      bg: 'civic',
      sources: ['s-039', 's-038', 's-037'],
      probability: 'Media',
      disruption: 3,
    },
    {
      id: 'f-04',
      year: '2042',
      horizon: 'Lejano',
      titulo: 'Perú sin capital',
      descripcion: 'Sin necesidad de centralizar todo en Lima, el país se reescribe como una red de valles conectados: Huancayo, Cusco, Cajamarca y Arequipa intercambian sombra, energía y memoria.',
      bg: 'distributed',
      sources: ['s-042', 's-039', 's-037'],
      probability: 'Baja',
      disruption: 5,
    },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      overflow: 'auto', fontFamily: typeSys.body,
      paddingBottom: 90,
    }}>
      {/* masthead */}
      <div style={{ padding: '58px 20px 6px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>
          <span>Generado por tus favoritas</span>
          <span>4 escenarios · vol. 02</span>
        </div>
        <div style={{
          marginTop: 6,
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 38, lineHeight: 0.95, letterSpacing: -1.4,
        }}>Futuros.</div>
        <div style={{
          marginTop: 4, fontSize: 13, color: INK_2, lineHeight: 1.45,
          textWrap: 'pretty',
        }}>
          Mundos posibles en el Perú — desde Huancayo —, construidos a partir de las señales que marcaste como favoritas.
        </div>
      </div>

      {/* Favoritas strip */}
      <div style={{ padding: '14px 0 0' }}>
        <div style={{
          padding: '0 20px',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
          marginBottom: 8, display: 'flex', justifyContent: 'space-between',
        }}>
          <span>★ Tus favoritas · ingrediente</span>
          <span>{favoritas.length}</span>
        </div>
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto',
          padding: '0 20px 6px',
        }}>
          {favoritas.map(s => (
            <div key={s.id}
              onClick={() => onOpenSignal?.(s)}
              style={{
                flexShrink: 0, width: 110, cursor: 'pointer',
                border: `1px solid ${RULE}`,
                padding: 8,
              }}>
              <div style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 9, color: accent.hex, letterSpacing: 1, marginBottom: 4,
              }}>★ {s.id}</div>
              <div style={{
                fontFamily: typeSys.display,
                fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                fontSize: 13, lineHeight: 1.1, letterSpacing: -0.3,
                color: INK,
              }}>{s.titulo}</div>
              <div style={{ marginTop: 6 }}>
                <TipoTag tipo={s.tipo} small accent={accent.hex}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Rule style={{ margin: '14px 20px 0' }}/>

      {/* Escenarios */}
      <div style={{ padding: '14px 20px 20px' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          ↘ Mundos posibles
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {escenarios.map((e, i) => (
            <ScenarioCard key={e.id} scenario={e} signals={signals} accent={accent} typeSys={typeSys} index={i} onOpenSignal={onOpenSignal}/>
          ))}
        </div>

        {/* Regenerate CTA */}
        <button onClick={() => { setActiveFavSet(s => s + 1); onRegenerate?.(); }} style={{
          marginTop: 20, width: '100%', padding: '14px',
          background: 'transparent', border: `1px dashed ${INK_3}`, cursor: 'pointer',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11, letterSpacing: 1.4, color: INK_2, textTransform: 'uppercase',
        }}>
          ↻ Regenerar con otras señales
        </button>
      </div>
    </div>
  );
}

// ── A single scenario card with distinct visual treatment ──
function ScenarioCard({ scenario, signals, accent, typeSys, index, onOpenSignal }) {
  const sourceSignals = scenario.sources
    .map(id => signals.find(s => s.id === id))
    .filter(Boolean);

  return (
    <div style={{
      border: `1px solid ${INK}`,
      background: PAPER,
      overflow: 'hidden',
    }}>
      {/* hero visual */}
      <ScenarioVisual kind={scenario.bg} accent={accent}/>

      <div style={{ padding: '16px 16px 18px' }}>
        {/* meta row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
        }}>
          <span>Escenario {scenario.id.replace('f-','')} · {scenario.horizon}</span>
          <span style={{ color: accent.hex }}>prob. {scenario.probability.toLowerCase()}</span>
        </div>

        {/* year + title */}
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{
            fontFamily: typeSys.display,
            fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
            fontSize: 44, letterSpacing: -2, color: accent.hex, lineHeight: 1,
            fontWeight: 500,
          }}>{scenario.year}</span>
          <div style={{
            fontFamily: typeSys.display,
            fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
            fontWeight: typeSys.displayWeight,
            fontSize: 22, lineHeight: 1, letterSpacing: -0.6,
            color: INK,
            textWrap: 'pretty',
            flex: 1,
          }}>{scenario.titulo}.</div>
        </div>

        {/* description */}
        <div style={{
          marginTop: 12, fontSize: 14, lineHeight: 1.5, color: INK_2,
          textWrap: 'pretty',
        }}>
          {scenario.descripcion}
        </div>

        <Rule style={{ marginTop: 14 }}/>

        {/* source signals + disruption */}
        <div style={{
          marginTop: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: 12, flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          }}>
            <span style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 9, letterSpacing: 1.2, color: INK_3, textTransform: 'uppercase',
            }}>fuentes</span>
            {sourceSignals.map(s => (
              <button key={s.id} onClick={() => onOpenSignal?.(s)} style={{
                padding: '3px 7px',
                background: 'transparent',
                border: `1px solid ${RULE}`,
                cursor: 'pointer',
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 9, color: INK_2, letterSpacing: 0.8,
              }}>{s.id}</button>
            ))}
          </div>
          <DisruptionMeter level={scenario.disruption} accent={accent.hex}/>
        </div>
      </div>
    </div>
  );
}

// ── Visual treatments per scenario kind ──
function ScenarioVisual({ kind, accent }) {
  if (kind === 'climate') {
    return (
      <div style={{
        height: 160, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(180deg, ${accent.hex} 0%, ${accent.soft} 60%, ${PAPER_DEEP} 100%)`,
      }}>
        <div style={{
          position: 'absolute', top: '15%', right: '12%',
          width: 50, height: 50, borderRadius: '50%',
          background: '#fff7d4',
          boxShadow: '0 0 40px rgba(255,235,150,0.7)',
        }}/>
        {[10, 30, 50, 70, 88].map((x, i) => {
          const h = 50 + (i % 2) * 20;
          return (
            <React.Fragment key={i}>
              <div style={{
                position: 'absolute', left: `${x}%`, bottom: 0,
                width: 36, height: 18,
                borderRadius: '18px 18px 0 0',
                background: i % 2 === 0 ? accent.ink : INK,
                opacity: 0.85,
                transform: 'translateX(-50%)',
              }}/>
              <div style={{
                position: 'absolute', left: `${x}%`, bottom: 0,
                width: 2, height: h,
                background: i % 2 === 0 ? accent.ink : INK,
                opacity: 0.85,
                transform: 'translateX(-50%)',
              }}/>
            </React.Fragment>
          );
        })}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.25,
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0 12px, rgba(255,255,255,0.4) 12px 13px)`,
        }}/>
      </div>
    );
  }

  if (kind === 'ghost') {
    return (
      <div style={{
        height: 160, position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 60%, #1F1A2E 0%, #0F0B1A 70%)',
      }}>
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 80, height: 100,
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.18), transparent 60%)',
        }}/>
        <div style={{
          position: 'absolute', left: '50%', top: '38%',
          transform: 'translate(-50%, -50%)',
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
        }}/>
        <div style={{
          position: 'absolute', bottom: 16, left: 16, right: 16,
          display: 'flex', alignItems: 'center', gap: 3, height: 30,
        }}>
          {Array.from({ length: 36 }).map((_, i) => {
            const h = Math.abs(Math.sin(i * 0.7)) * 0.7 + 0.2;
            return <div key={i} style={{
              flex: 1, height: `${h * 100}%`,
              background: i === 18 ? accent.hex : 'rgba(255,255,255,0.55)',
            }}/>;
          })}
        </div>
        <div style={{
          position: 'absolute', top: 12, left: 14,
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: 1.4,
          textTransform: 'uppercase',
        }}>audio · perpetuum_v3</div>
      </div>
    );
  }

  if (kind === 'civic') {
    return (
      <div style={{
        height: 160, position: 'relative', overflow: 'hidden',
        background: PAPER_DEEP,
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(3, 1fr)',
        gap: 6, padding: 10,
      }}>
        {[
          '◉','◐','◑','◒','◇',
          '◯','▣','▤','▥','◐',
          '▦','◉','◑','▢','◒',
        ].map((g, i) => (
          <div key={i} style={{
            background: i % 4 === 0 ? accent.hex : i % 3 === 0 ? INK : '#fff',
            color: i % 4 === 0 || i % 3 === 0 ? '#fff' : INK,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
            border: `1px solid ${RULE}`,
          }}>{g}</div>
        ))}
      </div>
    );
  }

  if (kind === 'distributed') {
    return (
      <div style={{
        height: 160, position: 'relative', overflow: 'hidden',
        background: `linear-gradient(135deg, ${INK} 0%, #1F1A18 100%)`,
      }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 320 160">
          {[
            [60, 40, 160, 80], [160, 80, 260, 40],
            [60, 40, 120, 120], [120, 120, 220, 130],
            [160, 80, 220, 130], [260, 40, 290, 100],
            [120, 120, 60, 100], [220, 130, 290, 100],
          ].map((l, i) => (
            <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]}
              stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" strokeDasharray="2 3"/>
          ))}
          {[
            { x: 60, y: 40, r: 5 }, { x: 160, y: 80, r: 9, big: true },
            { x: 260, y: 40, r: 5 }, { x: 120, y: 120, r: 5 },
            { x: 220, y: 130, r: 5 }, { x: 60, y: 100, r: 3 },
            { x: 290, y: 100, r: 4 },
          ].map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.r}
              fill={n.big ? accent.hex : 'rgba(255,255,255,0.85)'}
              stroke={n.big ? accent.ink : 'none'} strokeWidth={n.big ? 2 : 0}/>
          ))}
        </svg>
        <div style={{
          position: 'absolute', top: 12, left: 14,
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: 1.4,
          textTransform: 'uppercase',
        }}>red / aldea_007</div>
      </div>
    );
  }

  return null;
}
