// Señales — design tokens + tweak store
export const ACCENTS = {
  cinabrio: { name: 'Cinabrio', hex: '#C8462C', soft: '#F3D9D0', ink: '#6E2112' },
  tinta:    { name: 'Tinta',    hex: '#1F3A8A', soft: '#D6DCEE', ink: '#0E1E4D' },
  oliva:    { name: 'Oliva',    hex: '#5C6A2B', soft: '#E0E3CE', ink: '#2E3514' },
};

export const TYPE_SYSTEMS = {
  editorial: {
    name: 'Editorial',
    display: '"Fraunces", "Cormorant Garamond", Georgia, serif',
    body:    '"Inter", -apple-system, system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    displayWeight: 500,
    displayItalic: true,
  },
  mono: {
    name: 'Mono',
    display: '"JetBrains Mono", ui-monospace, Menlo, monospace',
    body:    '"Inter", -apple-system, system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    displayWeight: 500,
    displayItalic: false,
  },
  sans: {
    name: 'Sans',
    display: '"Space Grotesk", "Inter", -apple-system, system-ui, sans-serif',
    body:    '"Inter", -apple-system, system-ui, sans-serif',
    mono:    '"JetBrains Mono", ui-monospace, monospace',
    displayWeight: 500,
    displayItalic: false,
  },
};

export const PAPER = '#FFFFFF';
export const PAPER_DEEP = '#F4F1EB';
export const INK = '#14110F';
export const INK_2 = '#3A352E';
export const INK_3 = '#807871';
export const RULE = 'rgba(20,17,15,0.14)';

// Sample señales for the feed + prototype
export const SAMPLE_SIGNALS = [
  {
    id: 's-042',
    titulo: 'Sombra como servicio',
    descripcion: 'Vendedor ambulante renta sombrillas con publicidad geolocalizada en una esquina del Jr. Real, Huancayo.',
    imagen: 'sombrillas',
    tipo: 'social',
    escala: 'Corto',
    disrupcion: 3,
    tags: ['micro-economia', 'clima-urbano', 'publicidad-ambient'],
    autor: 'vera.m',
    fecha: 'hace 2h',
    lentes: {
      tecnologico: 'Infraestructura urbana sin permisos como red distribuida de atención: cada objeto de calle es un nodo publicitario de baja fricción. Resuelve el costo de adquirir audiencia hiperlocal en zonas donde los medios tradicionales no entran.',
      social: 'Lo público se privatiza a nivel objeto: alquilar sombra es alquilar un derecho climático. Surge un nuevo código —quién debe pagar por no sudar— y con él el dilema ético de monetizar el cuerpo frente al calor.',
      especulativo: '2036. El pronóstico del clima incluye "índice de sombra disponible". Cada cuadra tiene inventario dinámico de refugios efímeros alquilables por minuto. La alcaldía negocia una tarifa social para trayectos escolares bajo 34°C.',
    },
  },
  {
    id: 's-041',
    titulo: 'Duelo algorítmico',
    descripcion: 'Servicio de voz clonada para que los abuelos sigan leyendo cuentos a sus nietos tras su muerte.',
    imagen: 'voz',
    tipo: 'especulativo',
    escala: 'Medio',
    disrupcion: 5,
    tags: ['ia-generativa', 'duelo', 'memoria-familiar'],
    autor: 'tomás.r',
    fecha: 'hace 5h',
  },
  {
    id: 's-040',
    titulo: 'Panel solar de bolsillo',
    descripcion: 'Joven carga su celular con un panel flexible desplegable mientras camina por el parque.',
    imagen: 'solar',
    tipo: 'tecnologico',
    escala: 'Corto',
    disrupcion: 2,
    tags: ['energía-personal', 'movilidad', 'off-grid'],
    autor: 'luisa.k',
    fecha: 'ayer',
  },
  {
    id: 's-039',
    titulo: 'Reparación como ritual',
    descripcion: 'Taller abre los domingos para que vecinos traigan electrodomésticos rotos y los arreglen juntos tomando tinto.',
    imagen: 'repair',
    tipo: 'social',
    escala: 'Medio',
    disrupcion: 3,
    tags: ['derecho-a-reparar', 'tercer-lugar', 'anti-obsolescencia'],
    autor: 'marco.d',
    fecha: 'ayer',
  },
  {
    id: 's-038',
    titulo: 'Mascota sin dueño',
    descripcion: 'QR en el collar de un gato callejero: la cuadra entera lo alimenta y registra sus visitas en una app compartida.',
    imagen: 'gato',
    tipo: 'social',
    escala: 'Corto',
    disrupcion: 2,
    tags: ['cuidado-distribuido', 'vecindario', 'mascotas'],
    autor: 'ana.p',
    fecha: 'hace 2 días',
  },
  {
    id: 's-037',
    titulo: 'Agricultura vertical municipal',
    descripcion: 'La fachada del edificio de la alcaldía fue reemplazada por un muro de lechugas hidropónicas.',
    imagen: 'verde',
    tipo: 'tecnologico',
    escala: 'Largo',
    disrupcion: 4,
    tags: ['soberanía-alimentaria', 'arquitectura-viva', 'política-local'],
    autor: 'diego.s',
    fecha: 'hace 3 días',
  },
];

export const TIPO_META = {
  tecnologico: { label: 'Tecnológico', glifo: '◐', short: 'TEC' },
  social:      { label: 'Social',      glifo: '◑', short: 'SOC' },
  especulativo:{ label: 'Especulativo',glifo: '◒', short: 'FIC' },
};
