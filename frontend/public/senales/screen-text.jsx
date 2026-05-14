// Text/Nota capture — "una frase suelta, lo que viste"
function TextCaptureScreen({ accent, typeSys, onCapture, onBack }) {
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const prompts = [
    '¿Qué viste en la calle?',
    '¿Qué te detuvo?',
    '¿Algo que no encaja?',
    '¿Quién hace algo nuevo?',
  ];
  const [promptIdx] = useState(() => Math.floor(Math.random() * prompts.length));

  const quickTags = ['micro-economía', 'clima', 'cuidado', 'ia', 'cuerpo', 'mercado', 'ritual'];

  function toggleTag(t) {
    setTags(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      display: 'flex', flexDirection: 'column',
      fontFamily: typeSys.body,
    }}>
      {/* top bar */}
      <div style={{
        padding: '58px 20px 12px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${RULE}`,
      }}>
        <button onClick={onBack} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11, letterSpacing: 1.4, color: INK_2, padding: 0,
          textTransform: 'uppercase',
        }}>← cancelar</button>
        <span style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.4, color: INK_3,
        }}>nota · S-043</span>
      </div>

      {/* prompt + input */}
      <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>Una señal en una frase</div>
        <div style={{
          marginTop: 6,
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 30, lineHeight: 0.95, letterSpacing: -1, color: INK,
        }}>{prompts[promptIdx]}</div>

        <textarea
          ref={inputRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="ej: un vendedor está alquilando sombrillas por minuto en jr. real…"
          style={{
            marginTop: 20,
            width: '100%', minHeight: 140,
            border: 'none', outline: 'none',
            background: 'transparent',
            fontFamily: typeSys.body,
            fontSize: 18, lineHeight: 1.5, color: INK,
            resize: 'none',
          }}
        />

        {/* quick tags */}
        <div style={{ marginTop: 4 }}>
          <div style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 9, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
            marginBottom: 8,
          }}>etiquetas rápidas</div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {quickTags.map(t => {
              const on = tags.includes(t);
              return (
                <button key={t} onClick={() => toggleTag(t)} style={{
                  padding: '6px 10px', borderRadius: 100,
                  background: on ? accent.hex : 'transparent',
                  color: on ? '#fff' : INK_2,
                  border: `1px solid ${on ? accent.hex : RULE}`,
                  cursor: 'pointer',
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 10, letterSpacing: 0.5,
                }}>#{t}</button>
              );
            })}
          </div>
        </div>
      </div>

      {/* sticky footer */}
      <div style={{
        padding: '12px 20px 24px',
        borderTop: `1px solid ${RULE}`,
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        {/* dictate button */}
        <button style={{
          width: 48, height: 48, borderRadius: 24,
          background: 'transparent', border: `1px solid ${RULE}`,
          cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: INK_2,
        }} title="Dictar">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <rect x="5" y="1" width="8" height="12" rx="4" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M1 11a8 8 0 0016 0M9 19v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 10, letterSpacing: 1.2, color: INK_3,
          }}>{text.length} car. · {tags.length} tag</span>
        </div>
        <button onClick={() => onCapture?.()} disabled={!text} style={{
          padding: '0 18px', height: 48,
          background: text ? INK : RULE,
          color: text ? PAPER : INK_3,
          border: 'none', cursor: text ? 'pointer' : 'default',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase',
        }}>Descifrar →</button>
      </div>
    </div>
  );
}
window.TextCaptureScreen = TextCaptureScreen;
