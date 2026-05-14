// JSON editor + interpretation — single-screen review & publish
function PublishScreen({ signal, accent, typeSys, onBack, onPublish }) {
  const todayISO = '2026-04-17';

  const [data, setData] = useState({
    // 01 · Tu interpretación (was enrich)
    interpretacion: '',
    // 02 · Identidad
    titulo_senal: signal.titulo,
    descripcion_objetiva: signal.descripcion,
    // 03 · Clasificación PESTLE
    pestle: ['social', 'economica'],
    driver: 'cambio-climatico',
    categorias_emergentes: [...signal.tags],
    // 04 · Contexto
    lugar: 'Jr. Real × Jr. Ancash, Huancayo',
    region: 'Junín, Perú',
    alcance: 'local',
    fecha_captura: todayISO,
    fuente: 'observación directa',
    // 05 · Métricas
    escala_tiempo: `${signal.escala} plazo`,
    nivel_disrupcion: signal.disrupcion,
    confianza: 2,
    novedad: 3,
  });
  const [published, setPublished] = useState(false);
  const [metricsOpen, setMetricsOpen] = useState(false);
  const [interpMode, setInterpMode] = useState('text');

  const escalas = ['Corto plazo', 'Medio plazo', 'Largo plazo'];

  const suggestions = [
    'El vendedor dijo que esto empezó después de la ola de calor de enero.',
    'Todas las sombrillas tienen el logo de la misma marca.',
    'Lo vi también cerca del mercado mayorista.',
  ];

  const pestleOptions = [
    { k: 'politica',     l: 'Política',      letter: 'P' },
    { k: 'economica',    l: 'Económica',     letter: 'E' },
    { k: 'social',       l: 'Social',        letter: 'S' },
    { k: 'tecnologica',  l: 'Tecnológica',   letter: 'T' },
    { k: 'legal',        l: 'Legal',         letter: 'L' },
    { k: 'ambiental',    l: 'Ambiental',     letter: 'A' },
  ];

  const drivers = [
    { k: 'cambio-climatico',     l: 'Cambio climático' },
    { k: 'ia-generativa',        l: 'IA generativa' },
    { k: 'envejecimiento',       l: 'Envejecimiento poblacional' },
    { k: 'urbanizacion',         l: 'Urbanización del Perú' },
    { k: 'soberania-alimentaria',l: 'Soberanía alimentaria' },
    { k: 'economia-circular',    l: 'Economía circular' },
    { k: 'crisis-hidrica',       l: 'Crisis hídrica andina' },
    { k: 'polarizacion',         l: 'Polarización política' },
    { k: 'migracion-interna',    l: 'Migración interna andina' },
    { k: 'informalidad',         l: 'Economía informal' },
  ];

  const alcances = [
    { k: 'local',     l: 'Local',     hint: 'Barrio · ciudad' },
    { k: 'regional',  l: 'Regional',  hint: 'Junín · macroregión' },
    { k: 'nacional',  l: 'Nacional',  hint: 'Perú' },
    { k: 'global',    l: 'Global',    hint: 'Más allá' },
  ];

  const confianzas = [
    { k: 1, l: 'Especulación', hint: 'Una corazonada' },
    { k: 2, l: 'Indicio',      hint: 'Lo vi una vez' },
    { k: 3, l: 'Evidencia',    hint: 'Patrón confirmado' },
  ];

  function update(k, v) { setData(d => ({ ...d, [k]: v })); }

  function togglePestle(k) {
    update('pestle', data.pestle.includes(k) ? data.pestle.filter(x => x !== k) : [...data.pestle, k]);
  }

  function addTag() {
    update('categorias_emergentes', [...data.categorias_emergentes, 'nueva-etiqueta']);
  }
  function removeTag(i) {
    update('categorias_emergentes', data.categorias_emergentes.filter((_, j) => j !== i));
  }
  function editTag(i, v) {
    update('categorias_emergentes', data.categorias_emergentes.map((t, j) => j === i ? v : t));
  }

  function doPublish() {
    setPublished(true);
    setTimeout(() => { onPublish?.(); }, 1200);
  }

  // Completeness gauge
  const required = [data.titulo_senal, data.descripcion_objetiva, data.pestle.length, data.lugar, data.fecha_captura, data.driver];
  const filled = required.filter(Boolean).length;
  const completePct = Math.round((filled / required.length) * 100);

  return (
    <div style={{
      position: 'absolute', inset: 0, background: PAPER, color: INK,
      overflow: 'auto', fontFamily: typeSys.body,
    }}>
      {/* Top bar with completeness */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: `${PAPER}ee`, backdropFilter: 'blur(12px)',
        padding: '58px 20px 10px',
        borderBottom: `1px solid ${RULE}`,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <button onClick={onBack} style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 11, letterSpacing: 1.4, color: INK_2, padding: 0,
            textTransform: 'uppercase',
          }}>← descartar</button>
          <span style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 10, letterSpacing: 1.4, color: INK_3,
          }}>revisar · {signal.id}</span>
        </div>
        {/* completeness bar */}
        <div style={{
          marginTop: 8, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ flex: 1, height: 2, background: RULE, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, width: `${completePct}%`, background: accent.hex }}/>
          </div>
          <span style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 9, color: INK_3, letterSpacing: 1, textTransform: 'uppercase',
          }}>{completePct}% completo</span>
        </div>
      </div>

      <div style={{ padding: '22px 20px 140px' }}>
        <div style={{
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: 1.6, color: INK_3, textTransform: 'uppercase',
        }}>Antes de publicar al repositorio</div>
        <div style={{
          marginTop: 8,
          fontFamily: typeSys.display,
          fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
          fontWeight: typeSys.displayWeight,
          fontSize: 32, lineHeight: 0.98, letterSpacing: -1, color: INK,
        }}>Ajusta mi lectura.</div>

        {/* ─── 01 TU INTERPRETACIÓN ─── */}
        <SectionHead n="01" title="Tu interpretación" typeSys={typeSys} accent={accent}/>

        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', border: `1px solid ${RULE}`, marginBottom: 10 }}>
            {[
              { k: 'text', label: '✎ Texto' },
              { k: 'voice', label: '◉ Voz' },
            ].map((m, i) => (
              <button key={m.k} onClick={() => setInterpMode(m.k)} style={{
                flex: 1, padding: '10px 0',
                background: interpMode === m.k ? INK : 'transparent',
                color: interpMode === m.k ? PAPER : INK_2,
                border: 'none',
                borderLeft: i === 1 ? `1px solid ${RULE}` : 'none',
                cursor: 'pointer',
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase',
              }}>{m.label}</button>
            ))}
          </div>

          {interpMode === 'text' ? (
            <>
              <textarea
                value={data.interpretacion}
                onChange={e => update('interpretacion', e.target.value)}
                placeholder="¿Qué más sabes que yo no vi? Hipótesis, contexto, conversación…"
                rows={4}
                style={{ ...inputStyle(typeSys), resize: 'vertical', lineHeight: 1.5 }}
              />
              <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => update('interpretacion', data.interpretacion ? `${data.interpretacion}\n${s}` : s)} style={{
                    textAlign: 'left', padding: '8px 10px',
                    background: 'transparent', border: `1px dashed ${RULE}`,
                    cursor: 'pointer',
                    fontFamily: typeSys.body, fontSize: 12, color: INK_2,
                    lineHeight: 1.3,
                  }}>
                    <span style={{ color: accent.hex, marginRight: 6 }}>+</span>{s}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{
              padding: 16, border: `1px solid ${RULE}`, background: PAPER_DEEP,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
              }}>Listo para grabar</div>
              <button style={{
                width: 56, height: 56, borderRadius: 28,
                background: accent.hex, border: `3px solid ${accent.hex}44`,
                cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 16, height: 16, background: '#fff', borderRadius: '50%' }}/>
              </button>
              <div style={{ fontSize: 11, color: INK_3 }}>Toca para empezar · máx 30 seg.</div>
            </div>
          )}
        </div>

        {/* ─── 02 IDENTIDAD ─── */}
        <SectionHead n="02" title="Identidad" typeSys={typeSys} accent={accent}/>

        <Field label="Título de la señal" typeSys={typeSys}>
          <input value={data.titulo_senal} onChange={e => update('titulo_senal', e.target.value)}
            style={inputStyle(typeSys)}/>
        </Field>

        <Field label="Descripción objetiva" typeSys={typeSys}>
          <textarea value={data.descripcion_objetiva} onChange={e => update('descripcion_objetiva', e.target.value)}
            rows={3} style={{ ...inputStyle(typeSys), resize: 'vertical', lineHeight: 1.4 }}/>
        </Field>

        {/* ─── 03 CLASIFICACIÓN PESTLE ─── */}
        <SectionHead n="03" title="Clasificación PESTLE" typeSys={typeSys} accent={accent}/>

        <Field label="Dimensión PESTLE · selección múltiple" typeSys={typeSys}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {pestleOptions.map(p => {
              const on = data.pestle.includes(p.k);
              return (
                <button key={p.k} onClick={() => togglePestle(p.k)} style={{
                  padding: '10px 8px',
                  background: on ? INK : 'transparent',
                  color: on ? PAPER : INK,
                  border: `1px solid ${on ? INK : RULE}`,
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3,
                  textAlign: 'left',
                }}>
                  <span style={{
                    fontFamily: typeSys.display,
                    fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                    fontSize: 20, lineHeight: 1, color: on ? accent.hex : accent.hex,
                  }}>{p.letter}</span>
                  <span style={{
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: 9, letterSpacing: 0.8, textTransform: 'uppercase',
                  }}>{p.l}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Driver / Megatendencia" typeSys={typeSys}>
          <select value={data.driver} onChange={e => update('driver', e.target.value)} style={{
            ...inputStyle(typeSys),
            appearance: 'none', WebkitAppearance: 'none',
            backgroundImage: `linear-gradient(45deg, transparent 50%, ${INK_2} 50%), linear-gradient(135deg, ${INK_2} 50%, transparent 50%)`,
            backgroundPosition: 'calc(100% - 18px) 50%, calc(100% - 12px) 50%',
            backgroundSize: '6px 6px',
            backgroundRepeat: 'no-repeat',
            paddingRight: 32,
          }}>
            {drivers.map(d => <option key={d.k} value={d.k}>{d.l}</option>)}
          </select>
        </Field>

        <Field label="Etiquetas emergentes" typeSys={typeSys}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {data.categorias_emergentes.map((t, i) => (
              <div key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '4px 6px 4px 9px',
                border: `1px solid ${RULE}`,
              }}>
                <span style={{
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 11, color: INK_2,
                }}>#</span>
                <input value={t} onChange={e => editTag(i, e.target.value)} style={{
                  border: 'none', outline: 'none', background: 'transparent',
                  fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                  fontSize: 11, color: INK, padding: 0,
                  width: `${Math.max(5, t.length)}ch`,
                }}/>
                <button onClick={() => removeTag(i)} style={{
                  width: 16, height: 16, border: 'none', background: 'transparent',
                  cursor: 'pointer', color: INK_3, padding: 0,
                  fontSize: 12, lineHeight: 1,
                }}>×</button>
              </div>
            ))}
            <button onClick={addTag} style={{
              padding: '4px 10px', border: `1px dashed ${RULE}`,
              background: 'transparent', cursor: 'pointer',
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 11, color: INK_3,
            }}>+ añadir</button>
          </div>
        </Field>

        {/* ─── 04 CONTEXTO ─── */}
        <SectionHead n="04" title="Contexto geográfico y temporal" typeSys={typeSys} accent={accent}/>

        <Field label={
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: accent.hex }}>◉</span> Lugar específico
          </span>
        } typeSys={typeSys}>
          <input value={data.lugar} onChange={e => update('lugar', e.target.value)} style={inputStyle(typeSys)}/>
        </Field>

        <Field label="Región / país" typeSys={typeSys}>
          <input value={data.region} onChange={e => update('region', e.target.value)} style={inputStyle(typeSys)}/>
        </Field>

        <Field label="Alcance geográfico" typeSys={typeSys}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {alcances.map(a => {
              const on = data.alcance === a.k;
              return (
                <button key={a.k} onClick={() => update('alcance', a.k)} style={{
                  padding: '8px 4px',
                  background: on ? INK : 'transparent',
                  color: on ? PAPER : INK_2,
                  border: `1px solid ${on ? INK : RULE}`,
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                }}>
                  <span style={{
                    fontFamily: typeSys.display,
                    fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                    fontSize: 13, letterSpacing: -0.3,
                  }}>{a.l}</span>
                  <span style={{
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: 8, letterSpacing: 0.5, opacity: 0.7,
                  }}>{a.hint}</span>
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Fecha de captura" typeSys={typeSys}>
          <input type="date" value={data.fecha_captura} onChange={e => update('fecha_captura', e.target.value)}
            style={inputStyle(typeSys)}/>
        </Field>

        <Field label="Fuente / evidencia" typeSys={typeSys}>
          <input value={data.fuente} onChange={e => update('fuente', e.target.value)}
            placeholder="observación directa · enlace · conversación…"
            style={inputStyle(typeSys)}/>
        </Field>

        {/* ─── 05 MÉTRICAS (collapsible) ─── */}
        <div style={{
          marginTop: 32, paddingTop: 16,
          borderTop: `1px solid ${RULE}`,
        }}>
          <button onClick={() => setMetricsOpen(!metricsOpen)} style={{
            width: '100%', padding: 0, background: 'transparent', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 11, color: accent.hex, letterSpacing: 1.4,
              }}>05</span>
              <span style={{
                fontFamily: typeSys.display,
                fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                fontWeight: typeSys.displayWeight,
                fontSize: 20, letterSpacing: -0.5, color: INK,
              }}>Métricas de foresight</span>
            </div>
            <span style={{
              fontFamily: '"JetBrains Mono", ui-monospace, monospace',
              fontSize: 11, color: INK_3, letterSpacing: 1, textTransform: 'uppercase',
            }}>{metricsOpen ? 'ocultar −' : 'avanzado +'}</span>
          </button>
        </div>

        {metricsOpen && (
        <>
        <Field label="Horizonte temporal" typeSys={typeSys}>
          <div style={{ display: 'flex', gap: 6 }}>
            {escalas.map(e => (
              <button key={e} onClick={() => update('escala_tiempo', e)} style={{
                flex: 1, padding: '10px 0',
                background: data.escala_tiempo === e ? INK : 'transparent',
                color: data.escala_tiempo === e ? PAPER : INK_2,
                border: `1px solid ${data.escala_tiempo === e ? INK : RULE}`,
                cursor: 'pointer',
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase',
              }}>{e}</button>
            ))}
          </div>
        </Field>

        <Field label={`Nivel de disrupción · ${data.nivel_disrupcion}/5`} typeSys={typeSys}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => update('nivel_disrupcion', n)} style={{
                flex: 1, height: 36,
                background: n <= data.nivel_disrupcion ? accent.hex : 'transparent',
                border: `1px solid ${n <= data.nivel_disrupcion ? accent.hex : RULE}`,
                cursor: 'pointer', padding: 0,
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 11, color: n <= data.nivel_disrupcion ? '#fff' : INK_3,
              }}>{n}</button>
            ))}
          </div>
        </Field>

        <Field label={`Novedad · ${data.novedad}/5`} typeSys={typeSys}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => update('novedad', n)} style={{
                flex: 1, height: 36,
                background: n <= data.novedad ? INK : 'transparent',
                border: `1px solid ${n <= data.novedad ? INK : RULE}`,
                cursor: 'pointer', padding: 0,
                fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                fontSize: 11, color: n <= data.novedad ? '#fff' : INK_3,
              }}>{n}</button>
            ))}
          </div>
        </Field>

        <Field label="Nivel de confianza" typeSys={typeSys}>
          <div style={{ display: 'flex', gap: 4 }}>
            {confianzas.map(c => {
              const on = data.confianza === c.k;
              return (
                <button key={c.k} onClick={() => update('confianza', c.k)} style={{
                  flex: 1, padding: '10px 6px',
                  background: on ? INK : 'transparent',
                  color: on ? PAPER : INK_2,
                  border: `1px solid ${on ? INK : RULE}`,
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                }}>
                  <span style={{
                    fontFamily: typeSys.display,
                    fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
                    fontSize: 13, letterSpacing: -0.3,
                  }}>{c.l}</span>
                  <span style={{
                    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
                    fontSize: 8, letterSpacing: 0.5, opacity: 0.7, textAlign: 'center',
                  }}>{c.hint}</span>
                </button>
              );
            })}
          </div>
        </Field>
        </>
        )}

        {/* lens preview */}
        <div style={{
          marginTop: 24, padding: 14,
          border: `1px solid ${RULE}`, background: PAPER_DEEP,
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 9, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
          }}>Tres lentes · generadas por mí</div>
          <div style={{ marginTop: 8, fontSize: 12, lineHeight: 1.4, color: INK_2 }}>
            {signal.lentes?.tecnologico?.slice(0, 120)}…
          </div>
          <button style={{
            marginTop: 10, background: 'transparent', border: 'none', padding: 0,
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            fontSize: 10, letterSpacing: 1.4, color: accent.hex, cursor: 'pointer',
          }}>regenerar análisis →</button>
        </div>
      </div>

      {/* sticky publish footer */}
      <div style={{
        position: 'sticky', bottom: 0, background: PAPER,
        borderTop: `1px solid ${RULE}`, padding: '14px 20px 22px',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 10,
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 9, letterSpacing: 1.2, color: INK_3, textTransform: 'uppercase',
        }}>
          <span>Se publica como JSON al repositorio público</span>
          <span style={{ color: accent.hex }}>↗ trazable</span>
        </div>
        <button onClick={doPublish} disabled={published} style={{
          width: '100%', height: 52,
          background: published ? accent.hex : INK,
          color: PAPER, border: 'none', cursor: published ? 'default' : 'pointer',
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 12, letterSpacing: 1.8, textTransform: 'uppercase',
        }}>
          {published ? '✓ Publicada al repositorio' : 'Publicar al repositorio →'}
        </button>
      </div>
    </div>
  );
}

function SectionHead({ n, title, typeSys, accent }) {
  return (
    <div style={{
      marginTop: 32, paddingTop: 16,
      borderTop: `1px solid ${RULE}`,
      display: 'flex', alignItems: 'baseline', gap: 10,
    }}>
      <span style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 11, color: accent.hex, letterSpacing: 1.4,
      }}>{n}</span>
      <span style={{
        fontFamily: typeSys.display,
        fontStyle: typeSys.displayItalic ? 'italic' : 'normal',
        fontWeight: typeSys.displayWeight,
        fontSize: 20, letterSpacing: -0.5, color: INK,
      }}>{title}</span>
    </div>
  );
}

function Field({ label, typeSys, children }) {
  return (
    <div style={{ marginTop: 18 }}>
      <div style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 10, letterSpacing: 1.4, color: INK_3, textTransform: 'uppercase',
        marginBottom: 8,
      }}>{label}</div>
      {children}
    </div>
  );
}

function inputStyle(typeSys) {
  return {
    width: '100%', padding: '10px 12px',
    border: `1px solid ${RULE}`, background: PAPER_DEEP,
    fontFamily: typeSys.body, fontSize: 14, color: INK,
    outline: 'none', borderRadius: 0, boxSizing: 'border-box',
  };
}

window.PublishScreen = PublishScreen;
