import React from 'react';
import { PAPER, INK, INK_2, INK_3, RULE, TIPO_META } from '../tokens.js';
import { SignalImage, TipoTag, DisruptionMeter, Rule } from '../components/Atoms.jsx';

// ── Variant A: Editorial card ────────────────────────────────
export default function InsightEditorial({ signal, accent, typeSys, onOpen, onNewSignal }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      overflow: 'auto',
      fontFamily: typeSys.body,
    }}>
      <div style={{ padding: '70px 24px 24px' }}>
        {/* kicker */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>
          <span>Señal archivada · {signal.id}</span>
          <span>Huancayo · 14:02</span>
        </div>

        {/* Image as editorial plate */}
        <div style={{ marginTop: 18, position: 'relative' }}>
          <SignalImage kind={signal.imagen}/>
          <div style={{
            position: 'absolute', top: 10, left: 10,
            background: accent.hex, color: '#fff',
            padding: '3px 7px',
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 9, letterSpacing: 1.2,
          }}>
            NUEVA · {signal.id}
          </div>
        </div>

        {/* title — the hook */}
        <div style={{
          marginTop: 22,
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 40, lineHeight: 0.98, letterSpacing: -1,
          color: INK,
          textWrap: 'pretty',
        }}>
          «{signal.titulo}»
        </div>

        {/* subtitle / validation */}
        <div style={{
          marginTop: 16, fontSize: 16, lineHeight: 1.45, color: INK_2,
          textWrap: 'pretty',
        }}>
          Capturaste a un vendedor alquilando sombra por minuto — y con ella, el primer
          centímetro cuadrado de <em style={{ color: accent.hex }}>clima privatizado</em>.
        </div>

        <Rule style={{ marginTop: 28 }}/>

        {/* provocative open question */}
        <div style={{
          marginTop: 22,
          display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 12,
        }}>
          <div style={{
            fontFamily: typeSys.display,
            fontStyle: 'italic', fontSize: 34, lineHeight: 1,
            color: accent.hex,
          }}>?</div>
          <div style={{
            fontFamily: typeSys.display,
            fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
            fontWeight: typeSys.displayWeight,
            fontSize: 22, lineHeight: 1.2, color: INK,
            textWrap: 'pretty',
          }}>
            Si el aire tiene dueño, ¿qué más de la ciudad está esperando a ser tarifado?
          </div>
        </div>

        {/* meta row */}
        <div style={{
          marginTop: 32, display: 'flex', justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <TipoTag tipo={signal.tipo} accent={accent.hex}/>
          <DisruptionMeter level={signal.disrupcion} accent={accent.hex}/>
          <span style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 10, letterSpacing: 1.4, color: INK_3,
          }}>{signal.escala.toUpperCase()} PLAZO</span>
        </div>

        {/* CTA */}
        <button onClick={onOpen} style={{
          marginTop: 32, width: '100%', height: 52,
          background: INK, color: PAPER, border: 'none',
          borderRadius: 0,
          fontFamily: typeSys.body, fontSize: 14, letterSpacing: 2,
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          Añadir mi interpretación →
        </button>

        {/* Secondary CTA — add another signal */}
        <button onClick={onNewSignal} style={{
          marginTop: 10, width: '100%', height: 44,
          background: 'transparent', color: INK_2, border: `1px solid ${RULE}`,
          borderRadius: 0,
          fontFamily: typeSys.body, fontSize: 13, letterSpacing: 1.6,
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          + Añadir otra señal
        </button>

        <div style={{
          marginTop: 14, textAlign: 'center',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.4, color: INK_3,
        }}>
          JSON listo · enviado al repositorio público
        </div>
      </div>
    </div>
  );
}

// ── Variant B: Oráculo — minimal, center-stage type ─────────
export function InsightOraculo({ signal, accent, typeSys, onOpen, onNewSignal }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      fontFamily: typeSys.body,
      display: 'flex', flexDirection: 'column',
      padding: '70px 28px 40px',
    }}>
      {/* tiny sigil */}
      <div style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 10, letterSpacing: 2, color: INK_3, textAlign: 'center',
        textTransform: 'uppercase',
      }}>
        {signal.id}  ·  una señal fue registrada
      </div>

      {/* giant mark */}
      <div style={{
        marginTop: 48, textAlign: 'center',
        fontFamily: typeSys.display,
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 120, lineHeight: 1, color: accent.hex,
      }}>
        ·
      </div>

      {/* the title as a declaration */}
      <div style={{
        marginTop: 24,
        fontFamily: typeSys.display,
        fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
        fontWeight: typeSys.displayWeight,
        fontSize: 44, lineHeight: 0.95, letterSpacing: -1.2,
        textAlign: 'center',
        color: INK, textWrap: 'balance',
      }}>
        Sombra<br/>como servicio.
      </div>

      {/* hairline */}
      <div style={{
        marginTop: 28, height: 1, background: INK, opacity: 0.6,
        width: 40, alignSelf: 'center',
      }}/>

      {/* the question — center */}
      <div style={{
        marginTop: 28,
        fontSize: 16, lineHeight: 1.45, textAlign: 'center',
        color: INK_2, maxWidth: 280, alignSelf: 'center',
        textWrap: 'pretty',
      }}>
        Si el aire tiene dueño, ¿qué más de la ciudad está esperando a ser tarifado?
      </div>

      <div style={{ flex: 1 }}/>

      {/* meta */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20,
        marginBottom: 24,
      }}>
        <TipoTag tipo={signal.tipo} accent={accent.hex}/>
        <span style={{ width: 1, height: 10, background: RULE }}/>
        <DisruptionMeter level={signal.disrupcion} accent={accent.hex}/>
        <span style={{ width: 1, height: 10, background: RULE }}/>
        <span style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.4, color: INK_3,
        }}>{signal.escala.toUpperCase()}</span>
      </div>

      <button onClick={onOpen} style={{
        width: '100%', height: 52,
        background: 'transparent', color: INK,
        border: `1px solid ${INK}`, borderRadius: 26,
        fontFamily: typeSys.body, fontSize: 14, letterSpacing: 1,
        cursor: 'pointer',
      }}>
        Añadir mi lectura
      </button>

      <button onClick={onNewSignal} style={{
        marginTop: 10, width: '100%', height: 44,
        background: 'transparent', color: INK_3,
        border: 'none',
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase',
        cursor: 'pointer',
      }}>
        + añadir otra señal
      </button>
    </div>
  );
}

// ── Variant C: Field tool / monospace ───────────────────────
export function InsightFieldTool({ signal, accent, typeSys, onOpen, onNewSignal }) {
  const line = (k, v) => (
    <div style={{ display: 'flex', gap: 12, padding: '6px 0' }}>
      <span style={{ width: 70, color: INK_3 }}>{k}</span>
      <span style={{ flex: 1, color: INK }}>{v}</span>
    </div>
  );

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      overflow: 'auto',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 12, lineHeight: 1.5,
    }}>
      <div style={{ padding: '68px 20px 28px' }}>
        {/* header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
        }}>
          <span>◉ señal registrada</span>
          <span>17·04·26 · 14:02</span>
        </div>

        <Rule style={{ marginTop: 10 }}/>

        {/* big id */}
        <div style={{
          marginTop: 22, display: 'flex', alignItems: 'baseline', gap: 10,
        }}>
          <span style={{
            fontSize: 52, letterSpacing: -2, color: accent.hex,
            fontWeight: 500, lineHeight: 1,
          }}>{signal.id.replace('s-', '')}</span>
          <span style={{
            fontSize: 10, color: INK_3, letterSpacing: 1.4,
          }}>/ARCHIVO</span>
        </div>

        {/* title in sentence case, large */}
        <div style={{
          marginTop: 14,
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 32, lineHeight: 1, letterSpacing: -0.8,
          color: INK,
        }}>
          {signal.titulo}.
        </div>

        <Rule style={{ marginTop: 20 }}/>

        {/* data block */}
        <div style={{ marginTop: 16 }}>
          {line('VISTO', 'vendedor alquila sombra por minuto')}
          {line('LUGAR', 'jr. real × jr. ancash, huancayo')}
          {line('TIPO',  `${TIPO_META[signal.tipo].glifo} ${TIPO_META[signal.tipo].label.toLowerCase()}`)}
          {line('ESCALA', `${signal.escala.toLowerCase()} plazo`)}
          {line('DISRUP.', `${signal.disrupcion}/5`)}
          {line('TAGS',   signal.tags.join(' · '))}
        </div>

        <Rule style={{ marginTop: 14 }}/>

        {/* inline image */}
        <div style={{ marginTop: 16 }}>
          <SignalImage kind={signal.imagen}/>
        </div>

        {/* the question as a log entry */}
        <div style={{
          marginTop: 20, padding: 14,
          border: `1px solid ${accent.hex}`,
          background: `${accent.hex}0a`,
        }}>
          <div style={{
            fontSize: 9, letterSpacing: 1.6, color: accent.hex,
            textTransform: 'uppercase', marginBottom: 6,
          }}>
            {'>'} PREGUNTA ABIERTA
          </div>
          <div style={{
            fontFamily: typeSys.display,
            fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
            fontWeight: typeSys.displayWeight,
            fontSize: 18, lineHeight: 1.25, color: INK,
          }}>
            Si el aire tiene dueño, ¿qué más de la ciudad está esperando a ser tarifado?
          </div>
        </div>

        <button onClick={onOpen} style={{
          marginTop: 24, width: '100%', height: 46,
          background: INK, color: PAPER, border: 'none',
          fontFamily: 'inherit', fontSize: 12, letterSpacing: 1.6,
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          → añadir contexto
        </button>

        <button onClick={onNewSignal} style={{
          marginTop: 8, width: '100%', height: 42,
          background: 'transparent', color: INK_2,
          border: `1px dashed ${RULE}`,
          fontFamily: 'inherit', fontSize: 11, letterSpacing: 1.4,
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          + añadir otra señal
        </button>
      </div>
    </div>
  );
}
