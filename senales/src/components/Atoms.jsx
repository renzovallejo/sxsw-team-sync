import React from 'react';
import { TIPO_META, INK_2, RULE } from '../tokens.js';

// Placeholder image: subtle striped SVG, captioned with mono text
export function Placeholder({ label, ratio = '4/5', tone = '#D7CFC0', stripe = '#CABEAA', style = {}, dark = false }) {
  const bg = dark ? '#1a1915' : '#E8E0D0';
  const stripeC = dark ? 'rgba(255,255,255,0.04)' : 'rgba(20,17,15,0.04)';
  const textC = dark ? 'rgba(255,255,255,0.45)' : 'rgba(20,17,15,0.45)';
  return (
    <div style={{
      aspectRatio: ratio, width: '100%',
      background: `repeating-linear-gradient(135deg, ${bg} 0 18px, ${stripeC} 18px 19px)`,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: 12, boxSizing: 'border-box',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: 10, color: textC, letterSpacing: 0.5, textTransform: 'uppercase',
      ...style,
    }}>
      <span>◦ {label}</span>
      <span>IMG</span>
    </div>
  );
}

// Tipo pill with glyph
export function TipoTag({ tipo, small = false, accent }) {
  const meta = TIPO_META[tipo];
  if (!meta) return null;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      fontSize: small ? 9 : 10, letterSpacing: 0.8, textTransform: 'uppercase',
      color: accent || INK_2,
    }}>
      <span style={{ fontSize: small ? 10 : 12, lineHeight: 1 }}>{meta.glifo}</span>
      {meta.short}
    </span>
  );
}

// Disruption meter — 5 small ticks
export function DisruptionMeter({ level = 3, accent = '#C8462C', size = 'sm' }) {
  const w = size === 'lg' ? 18 : 10;
  const h = size === 'lg' ? 3 : 2;
  return (
    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{
          width: w, height: h,
          background: i <= level ? accent : 'rgba(20,17,15,0.15)',
        }} />
      ))}
    </span>
  );
}

// Hairline rule
export function Rule({ style = {} }) {
  return <div style={{ height: 1, background: RULE, ...style }} />;
}

// Specimen image (symbolic, not photorealistic)
export function SignalImage({ kind, style = {}, dark = false }) {
  const labels = {
    sombrillas: 'sombrilla con marca',
    voz: 'forma de onda',
    solar: 'panel desplegable',
    repair: 'tostadora abierta',
    gato: 'gato + collar qr',
    verde: 'muro vegetal',
  };
  return <Placeholder label={labels[kind] || kind} ratio="4/5" dark={dark} style={style} />;
}
