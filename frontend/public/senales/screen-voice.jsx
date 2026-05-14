// Voice capture — waveform while listening
function VoiceScreen({ accent, typeSys, onCapture, onBack }) {
  const [listening, setListening] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!listening) return;
    const i = setInterval(() => setElapsed(e => e + 0.1), 100);
    return () => clearInterval(i);
  }, [listening]);

  // fake waveform bars — 40 bars that wobble
  const [seed, setSeed] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setSeed(s => s + 1), 90);
    return () => clearInterval(i);
  }, []);

  const bars = Array.from({ length: 44 }).map((_, i) => {
    const base = Math.sin(i * 0.6 + seed * 0.3) * 0.5 + 0.5;
    const wobble = Math.sin(i * 1.3 + seed * 0.9) * 0.3;
    return Math.max(0.08, Math.min(1, base * 0.7 + wobble * 0.5));
  });

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(Math.floor(elapsed % 60)).padStart(2, '0');
  const ds = String(Math.floor((elapsed * 10) % 10));

  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#0F0D0B', color: '#fff',
      fontFamily: typeSys.body,
      display: 'flex', flexDirection: 'column',
      padding: '60px 24px 40px',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 10, letterSpacing: 1.8, color: 'rgba(255,255,255,0.55)',
        textTransform: 'uppercase',
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', color: 'inherit',
          fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit',
          textTransform: 'inherit', cursor: 'pointer', padding: 0,
        }}>← cerrar</button>
        <span style={{ color: accent.hex }}>◉ Escuchando</span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* timer */}
        <div style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 52, fontWeight: 400, letterSpacing: -1,
          textAlign: 'center', color: '#fff',
        }}>
          {mm}:{ss}<span style={{ opacity: 0.4, fontSize: 28 }}>.{ds}</span>
        </div>

        {/* waveform */}
        <div style={{
          marginTop: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3,
          height: 120,
        }}>
          {bars.map((b, i) => (
            <div key={i} style={{
              width: 3, height: `${b * 100}%`,
              background: i % 7 === 0 ? accent.hex : 'rgba(255,255,255,0.85)',
              borderRadius: 2,
              transition: 'height 80ms ease-out',
            }}/>
          ))}
        </div>

        {/* live transcript */}
        <div style={{
          marginTop: 40, padding: '0 10px',
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 22, lineHeight: 1.3, textAlign: 'center',
          color: '#fff', textWrap: 'pretty',
          minHeight: 90,
        }}>
          «vi a un señor en el jirón real alquilando sombrillas…»
          <span style={{ opacity: 0.45 }}> con publicidad encima… como tres soles los quince minutos…</span>
        </div>
      </div>

      {/* stop button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <button onClick={() => { setListening(false); onCapture?.(); }} style={{
          width: 72, height: 72, borderRadius: 36,
          background: accent.hex, border: `3px solid ${accent.hex}55`,
          cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 22, height: 22, background: '#fff', borderRadius: 3 }}/>
        </button>
      </div>
      <div style={{
        marginTop: 12, textAlign: 'center',
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 10, letterSpacing: 1.6, color: 'rgba(255,255,255,0.5)',
        textTransform: 'uppercase',
      }}>
        Toca para detener · suelto, yo lo descifro
      </div>
    </div>
  );
}
window.VoiceScreen = VoiceScreen;
