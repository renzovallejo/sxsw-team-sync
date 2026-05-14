// Onboarding — 3 cards introducing the agent's promise
function OnboardingScreen({ accent, typeSys, onDone }) {
  const [step, setStep] = useState(0);
  const cards = [
    {
      kicker: '01 · La promesa',
      title: 'Un destello.\nYo miro por ti.',
      body: 'Capturas algo que te llamó la atención — una foto, tres segundos de voz, una nota. Yo lo analizo desde tres lentes: tecnológica, social y especulativa.',
    },
    {
      kicker: '02 · El repositorio',
      title: 'Señales comparten\nseñales.',
      body: 'Tu hallazgo se une al repositorio público, alimenta futuros y conversa con otras señales del Perú.',
    },
  ];
  const c = cards[step];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      fontFamily: typeSys.body,
      display: 'flex', flexDirection: 'column',
      padding: '70px 28px 40px',
    }}>
      <div style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 10, letterSpacing: 2, color: INK_3, textTransform: 'uppercase',
      }}>{c.kicker}</div>

      {/* abstract mark */}
      <div style={{ marginTop: 28, height: 170, position: 'relative' }}>
        {step === 0 && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18,
          }}>
            {['◐','◑','◒'].map((g, i) => (
              <div key={i} style={{
                fontSize: 56, color: i === 1 ? accent.hex : INK,
                opacity: i === 1 ? 1 : 0.6,
                transform: i === 1 ? 'scale(1.15)' : 'none',
              }}>{g}</div>
            ))}
          </div>
        )}
        {step === 1 && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6,
          }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} style={{
                background: i % 5 === 0 ? accent.hex : i % 3 === 0 ? INK : `${INK}22`,
                opacity: i % 5 === 0 ? 1 : i % 3 === 0 ? 0.6 : 0.3,
              }}/>
            ))}
          </div>
        )}
      </div>

      <div style={{
        marginTop: 40,
        fontFamily: typeSys.display,
        fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
        fontWeight: typeSys.displayWeight,
        fontSize: 42, lineHeight: 0.98, letterSpacing: -1.4,
        whiteSpace: 'pre-line', textWrap: 'pretty',
      }}>{c.title}</div>

      <div style={{
        marginTop: 16, fontSize: 15, lineHeight: 1.5, color: INK_2,
        textWrap: 'pretty',
      }}>{c.body}</div>

      <div style={{ flex: 1 }}/>

      {/* progress */}
      <div style={{
        display: 'flex', gap: 6, marginBottom: 20,
      }}>
        {cards.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 2,
            background: i <= step ? accent.hex : RULE,
            transition: 'background 300ms',
          }}/>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onDone} style={{
          padding: '0 18px', height: 48,
          background: 'transparent', color: INK_2,
          border: `1px solid ${RULE}`, borderRadius: 24,
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11, letterSpacing: 1.4, cursor: 'pointer',
          textTransform: 'uppercase',
        }}>Saltar</button>
        <button onClick={() => step < cards.length - 1 ? setStep(step + 1) : onDone()} style={{
          flex: 1, height: 48,
          background: INK, color: PAPER, border: 'none',
          borderRadius: 24, cursor: 'pointer',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11, letterSpacing: 1.6, textTransform: 'uppercase',
        }}>
          {step < cards.length - 1 ? 'Siguiente →' : 'Abrir cámara'}
        </button>
      </div>
    </div>
  );
}
window.OnboardingScreen = OnboardingScreen;
