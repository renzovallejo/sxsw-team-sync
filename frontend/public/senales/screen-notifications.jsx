// Notifications — feed of interactions with the user's signals
function NotificationsScreen({ accent, typeSys, onBack, onOpenSignal, onOpenFuturos, onOpenProfile }) {
  const [filter, setFilter] = useState('all');

  const notifs = [
    {
      k: 'resonance', icon: '∞',
      who: '@tomás.r', region: 'Lima',
      action: 'resonó con tu señal',
      target: 's-042 · Sombra como servicio',
      time: 'hace 14m',
      fresh: true,
    },
    {
      k: 'future', icon: '◐',
      who: 'agente',
      action: 'usó tu señal en un nuevo Futuro',
      target: '2031 · Huancayo alquila su sombra',
      time: 'hace 2h',
      fresh: true,
    },
    {
      k: 'level', icon: '★',
      action: 'tu curiosidad subió +5',
      target: '64 · Exploradora',
      time: 'hace 2h',
      fresh: true,
    },
    {
      k: 'mention', icon: '◑',
      who: '@ana.p', region: 'Cusco',
      action: 'capturó algo parecido a',
      target: 's-038 · Mascota sin dueño',
      time: 'ayer',
    },
    {
      k: 'rank', icon: '◇',
      action: 'subiste al puesto',
      target: '#3 en el ranking del mes',
      time: 'ayer',
    },
    {
      k: 'resonance', icon: '∞',
      who: '@diego.s', region: 'Loreto',
      action: 'comentó en',
      target: 's-040 · Panel solar de bolsillo',
      time: 'hace 2 días',
    },
  ];

  const filters = [
    { k: 'all', label: 'Todo', count: notifs.length },
    { k: 'resonance', label: 'Resonancias', count: notifs.filter(n => n.k === 'resonance').length },
    { k: 'future', label: 'Futuros', count: notifs.filter(n => n.k === 'future').length },
    { k: 'level', label: 'Logros', count: notifs.filter(n => ['level','rank'].includes(n.k)).length },
  ];

  const filtered = filter === 'all' ? notifs
    : filter === 'level' ? notifs.filter(n => ['level','rank'].includes(n.k))
    : notifs.filter(n => n.k === filter);

  function handleClick(n) {
    if (n.k === 'future') onOpenFuturos?.();
    else if (['level','rank'].includes(n.k)) onOpenProfile?.();
    else if (n.target?.startsWith('s-')) onOpenSignal?.();
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      overflow: 'auto', fontFamily: typeSys.body,
    }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: `${PAPER}ee`, backdropFilter: 'blur(12px)',
        padding: '58px 20px 10px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${RULE}`,
      }}>
        <button onClick={onBack} style={{
          border: 'none', background: 'transparent', cursor: 'pointer',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 11, letterSpacing: 1.4, color: INK_2, padding: 0,
          textTransform: 'uppercase',
        }}>← volver</button>
        <span style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.4, color: INK_3,
          textTransform: 'uppercase',
        }}>3 nuevas</span>
      </div>

      <div style={{ padding: '18px 20px 8px' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>Tu señal hace eco</div>
        <div style={{
          marginTop: 4,
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 32, lineHeight: 0.98, letterSpacing: -1, color: INK,
        }}>Notificaciones.</div>
      </div>

      {/* filter chips */}
      <div style={{
        display: 'flex', gap: 6, padding: '10px 20px 14px',
        overflowX: 'auto',
        borderBottom: `1px solid ${RULE}`,
      }}>
        {filters.map(f => {
          const active = filter === f.k;
          return (
            <button key={f.k} onClick={() => setFilter(f.k)} style={{
              flexShrink: 0, padding: '7px 12px', borderRadius: 100,
              background: active ? INK : 'transparent',
              color: active ? PAPER : INK_2,
              border: `1px solid ${active ? INK : RULE}`,
              cursor: 'pointer',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 10, letterSpacing: 1, textTransform: 'uppercase',
              display: 'inline-flex', gap: 6, alignItems: 'center',
            }}>{f.label} <span style={{ opacity: 0.6 }}>{f.count}</span></button>
          );
        })}
      </div>

      {/* list */}
      <div style={{ padding: '0 20px 40px' }}>
        {filtered.map((n, i) => (
          <div key={i} onClick={() => handleClick(n)} style={{
            padding: '14px 0',
            borderBottom: i === filtered.length - 1 ? 'none' : `1px solid ${RULE}`,
            cursor: 'pointer',
            display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 12, alignItems: 'flex-start',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: n.fresh ? accent.hex : PAPER_DEEP,
              border: `1px solid ${n.fresh ? accent.ink : RULE}`,
              color: n.fresh ? '#fff' : INK_2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, lineHeight: 1, fontWeight: 500,
              flexShrink: 0, marginTop: 2,
            }}>{n.icon}</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, lineHeight: 1.4, color: INK_2 }}>
                {n.who && (
                  <>
                    <span style={{ color: INK, fontWeight: 500 }}>{n.who}</span>
                    {n.region && (
                      <span style={{
                        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                        fontSize: 9, color: INK_3, marginLeft: 5, letterSpacing: 0.5,
                      }}>· {n.region}</span>
                    )}
                    {' '}
                  </>
                )}
                {n.action}
              </div>
              <div style={{
                marginTop: 4,
                fontFamily: typeSys.display,
                fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                fontWeight: typeSys.displayWeight,
                fontSize: 16, lineHeight: 1.15, letterSpacing: -0.3, color: INK,
              }}>{n.target}</div>
            </div>
            <div style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 9, color: INK_3, letterSpacing: 0.6, whiteSpace: 'nowrap', marginTop: 4,
            }}>{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
window.NotificationsScreen = NotificationsScreen;
