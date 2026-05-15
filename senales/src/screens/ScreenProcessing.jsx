import React, { useState, useEffect } from 'react';
import { PAPER, INK, INK_3, RULE } from '../tokens.js';

// Processing screen — agent "thinks"
export default function ProcessingScreen({ accent, typeSys, onDone }) {
  const steps = [
    { k: 'sight',   label: 'Reconociendo la imagen',   detail: 'sombrilla con logo de marca sobre andén' },
    { k: 'tec',     label: 'Lente tecnológico',         detail: 'infraestructura urbana como red publicitaria' },
    { k: 'soc',     label: 'Lente social',              detail: 'privatización de lo climático' },
    { k: 'spec',    label: 'Lente especulativo',        detail: '2036 · sombra tarifada por minuto' },
  ];
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [];
    steps.forEach((_, i) => {
      timers.push(setTimeout(() => setStage(i + 1), 650 + i * 850));
    });
    timers.push(setTimeout(() => onDone?.(), 650 + steps.length * 850 + 400));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: PAPER,
      color: INK,
      padding: '96px 28px 40px',
      display: 'flex', flexDirection: 'column',
      fontFamily: typeSys.body,
    }}>
      {/* mark */}
      <div style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 10, letterSpacing: 2, color: INK_3, textTransform: 'uppercase',
      }}>
        Descifrando señal · S-042
      </div>

      {/* spinning conceptual orb */}
      <div style={{
        position: 'relative', width: 120, height: 120, marginTop: 28, marginBottom: 32,
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: `1px solid ${RULE}`,
          animation: 'spin 12s linear infinite',
        }}/>
        <div style={{
          position: 'absolute', inset: 12, borderRadius: '50%',
          border: `1px dashed ${RULE}`,
          animation: 'spin 8s linear infinite reverse',
        }}/>
        <div style={{
          position: 'absolute', inset: 28, borderRadius: '50%',
          background: accent.hex, opacity: 0.9,
          animation: 'pulse 2s ease-in-out infinite',
        }}/>
        <div style={{
          position: 'absolute', top: -2, left: '50%', transform: 'translateX(-50%)',
          width: 5, height: 5, background: accent.hex, borderRadius: '50%',
          animation: 'orbit 3s linear infinite',
          transformOrigin: '50% 62px',
        }}/>
      </div>

      {/* steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {steps.map((s, i) => {
          const active = i < stage;
          const current = i === stage - 1;
          return (
            <div key={s.k} style={{
              opacity: active ? 1 : 0.3,
              transition: 'opacity 300ms',
              display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <div style={{
                marginTop: 6,
                width: 8, height: 8, borderRadius: '50%',
                background: active ? accent.hex : 'transparent',
                border: `1px solid ${active ? accent.hex : INK_3}`,
                flexShrink: 0,
                boxShadow: current ? `0 0 0 4px ${accent.hex}22` : 'none',
                transition: 'all 240ms',
              }}/>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10, letterSpacing: 1.5, color: INK_3, textTransform: 'uppercase',
                }}>{s.label}</div>
                <div style={{
                  fontFamily: typeSys.display,
                  fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                  fontWeight: typeSys.displayWeight,
                  fontSize: 18, lineHeight: 1.25, color: INK,
                  marginTop: 2,
                }}>{s.detail}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ flex: 1 }}/>

      <div style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 10, letterSpacing: 1.5, color: INK_3, textAlign: 'center',
        textTransform: 'uppercase',
      }}>
        Guarda el teléfono. Esto toma 3 segundos.
      </div>
    </div>
  );
}
