import React, { useState } from 'react';

// Camera capture screen — full-bleed viewfinder with reticle + minimal chrome
export default function CameraScreen({ onCapture, onBack, accent, typeSys }) {
  const [flashed, setFlashed] = useState(false);

  function handleShutter() {
    setFlashed(true);
    setTimeout(() => { setFlashed(false); onCapture?.(); }, 180);
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#0F0D0B',
      overflow: 'hidden',
    }}>
      {/* viewfinder — impressionistic scene (sombrillas street vendor) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse at 50% 35%, rgba(200,180,140,0.25) 0%, transparent 55%),
          radial-gradient(ellipse at 20% 80%, rgba(120,90,70,0.35) 0%, transparent 50%),
          linear-gradient(180deg, #241E18 0%, #1a1510 65%, #0b0906 100%)
        `,
      }}>
        {/* simulated sombrilla silhouettes */}
        <div style={{
          position: 'absolute', left: '18%', top: '40%',
          width: 70, height: 70, borderRadius: '50% 50% 4px 4px / 70% 70% 4px 4px',
          background: `linear-gradient(180deg, ${accent.hex} 0%, ${accent.ink} 100%)`,
          opacity: 0.75,
          transform: 'rotate(-6deg)',
        }}/>
        <div style={{
          position: 'absolute', left: '16%', top: '68%',
          width: 2, height: 90, background: 'rgba(255,255,255,0.18)',
        }}/>
        <div style={{
          position: 'absolute', left: '48%', top: '35%',
          width: 90, height: 90, borderRadius: '50% 50% 4px 4px / 70% 70% 4px 4px',
          background: 'linear-gradient(180deg, #a08563 0%, #5c4830 100%)',
          opacity: 0.8,
        }}/>
        <div style={{
          position: 'absolute', left: '54%', top: '66%',
          width: 2, height: 110, background: 'rgba(255,255,255,0.18)',
        }}/>
        {/* grain */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.22,
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>")`,
          mixBlendMode: 'overlay',
        }}/>
      </div>

      {/* top chrome — back button + brand */}
      <div style={{
        position: 'absolute', top: 60, left: 0, right: 0, padding: '8px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 18,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.25)',
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, lineHeight: 1,
        }}>‹</button>
        <span style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, color: 'rgba(255,255,255,0.7)',
        }}>◉ REC</span>
      </div>

      {/* brand wordmark */}
      <div style={{
        position: 'absolute', top: 92, left: 0, right: 0, textAlign: 'center',
        color: '#fff',
        fontFamily: typeSys.display,
        fontSize: 36,
        fontWeight: typeSys.displayWeight,
        fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
        letterSpacing: -0.5,
      }}>
        Señales
      </div>

      {/* reticle */}
      <div style={{
        position: 'absolute', left: '50%', top: '46%',
        transform: 'translate(-50%, -50%)',
        width: 220, height: 220,
      }}>
        {[{t:0,l:0,r:'0 0 0 1'},{t:0,r:0,r2:'0 0 1 0'},{b:0,l:0,r3:'0 1 0 0'},{b:0,r:0,r4:'1 0 0 0'}].map((c,i)=>{
          const pos = i===0?{top:0,left:0}:i===1?{top:0,right:0}:i===2?{bottom:0,left:0}:{bottom:0,right:0};
          const borders = i===0?{borderTop:'2px solid',borderLeft:'2px solid'}
            : i===1?{borderTop:'2px solid',borderRight:'2px solid'}
            : i===2?{borderBottom:'2px solid',borderLeft:'2px solid'}
            : {borderBottom:'2px solid',borderRight:'2px solid'};
          return <div key={i} style={{
            position:'absolute', ...pos, width: 24, height: 24,
            borderColor: accent.hex, ...borders,
          }}/>;
        })}
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
          width: 3, height: 3, background: accent.hex,
        }}/>
      </div>

      {/* hint */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 'calc(46% + 140px)',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.75)',
        fontFamily: typeSys.body, fontSize: 13, letterSpacing: 0.2,
      }}>
        Apunta y suelta. El resto lo hago yo.
      </div>

      {/* bottom chrome */}
      <div style={{
        position: 'absolute', bottom: 48, left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 36px',
      }}>
        {/* left: voice mode */}
        <button onClick={handleShutter} style={{
          width: 52, height: 52, borderRadius: 26,
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.22)',
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <rect x="5" y="1" width="8" height="12" rx="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M1 11a8 8 0 0016 0M9 19v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* shutter */}
        <button onClick={handleShutter} style={{
          width: 78, height: 78, borderRadius: 39,
          background: 'rgba(255,255,255,0.1)', border: '3px solid rgba(255,255,255,0.9)',
          cursor: 'pointer', position: 'relative',
          padding: 0,
        }}>
          <div style={{
            position: 'absolute', inset: 6, borderRadius: '50%',
            background: '#fff',
            boxShadow: `0 0 0 2px ${accent.hex}33`,
          }}/>
        </button>

        {/* right: note */}
        <button onClick={handleShutter} style={{
          width: 52, height: 52, borderRadius: 26,
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.22)',
          color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 14l5-1L15 5l-3-3L4 10l-2 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* mode label */}
      <div style={{
        position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center',
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 10, letterSpacing: 1.5, color: 'rgba(255,255,255,0.55)',
      }}>
        VOZ · CAPTURA · NOTA
      </div>

      {/* flash */}
      {flashed && <div style={{
        position: 'absolute', inset: 0, background: '#fff', opacity: 0.7,
        animation: 'flash 180ms',
      }}/>}
    </div>
  );
}
