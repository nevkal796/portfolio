import { useScrollReveal, useInView } from '../../lib/useScrollReveal'

const CATEGORY_COLOR = {
  lang:    '#5CE1FF',
  front:   '#FF3EA5',
  back:    '#7A4BFF',
  systems: '#3EE8B5',
  tools:   '#FFB347',
} as const

const CATEGORY_LABEL = {
  lang:    'Languages',
  front:   'Frontend',
  back:    'Backend / DB',
  systems: 'Systems / ML',
  tools:   'Tools',
} as const

type Category = keyof typeof CATEGORY_COLOR

interface SkillNode { id: string; label: string; x: number; y: number; category: Category }
interface Edge { from: string; to: string }

const NODES: SkillNode[] = [
  { id: 'core',   label: 'CS Fundamentals', x: 500, y: 300, category: 'lang' },
  { id: 'ts',     label: 'TypeScript',       x: 280, y: 180, category: 'lang' },
  { id: 'py',     label: 'Python',           x: 180, y: 240, category: 'lang' },
  { id: 'rust',   label: 'Rust',             x: 200, y: 340, category: 'lang' },
  { id: 'go',     label: 'Go',               x: 110, y: 160, category: 'lang' },
  { id: 'react',  label: 'React',            x: 720, y: 180, category: 'front' },
  { id: 'tw',     label: 'Tailwind',         x: 820, y: 240, category: 'front' },
  { id: 'solid',  label: 'SolidJS',          x: 880, y: 160, category: 'front' },
  { id: 'node',   label: 'Node',             x: 800, y: 340, category: 'back' },
  { id: 'pg',     label: 'Postgres',         x: 890, y: 400, category: 'back' },
  { id: 'redis',  label: 'Redis',            x: 820, y: 460, category: 'back' },
  { id: 'docker', label: 'Docker',           x: 300, y: 460, category: 'systems' },
  { id: 'torch',  label: 'PyTorch',          x: 180, y: 420, category: 'systems' },
  { id: 'k8s',    label: 'K8s',              x: 120, y: 500, category: 'systems' },
  { id: 'git',    label: 'Git',              x: 420, y: 480, category: 'tools' },
  { id: 'linux',  label: 'Linux',            x: 560, y: 500, category: 'tools' },
  { id: 'figma',  label: 'Figma',            x: 650, y: 460, category: 'tools' },
]

const EDGES: Edge[] = [
  ['core','ts'], ['ts','py'], ['py','rust'], ['ts','go'], ['py','torch'],
  ['core','react'], ['react','tw'], ['react','solid'], ['ts','react'],
  ['core','node'], ['node','pg'], ['node','redis'],
  ['core','docker'], ['docker','torch'], ['docker','k8s'],
  ['core','git'], ['core','linux'], ['core','figma'],
].map(([from, to]) => ({ from, to }))

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 83.7) % 100,
  s: 0.4 + (i % 4) * 0.35,
  delay: (i * 0.29) % 3,
  dur: 1.4 + (i % 6) * 0.4,
}))

function hexPoints(cx: number, cy: number, r: number): string {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2
    pts.push(`${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`)
  }
  return pts.join(' ')
}

function starPoints(cx: number, cy: number, r: number): string {
  const pts = []
  for (let i = 0; i < 16; i++) {
    const a = (Math.PI / 8) * i - Math.PI / 2
    const rad = i % 2 === 0 ? r : r * 0.42
    pts.push(`${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad}`)
  }
  return pts.join(' ')
}

export default function SkillTree() {
  const [sectionRef, inView] = useInView<HTMLElement>(0.2)
  const headingRef = useScrollReveal<HTMLDivElement>()

  return (
    <section ref={sectionRef} id="scene-skills" style={{
      width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(to bottom, #0A0F1F 0%, #131A38 60%, #0F2A44 100%)',
    }}>

      {/* Stars */}
      {STARS.map(s => (
        <div key={s.id} style={{
          position: 'absolute', borderRadius: '50%', background: '#fff',
          width: s.s, height: s.s,
          left: `${s.x}%`, top: `${s.y}%`,
          animation: `sparkle-pulse ${s.dur}s ease-in-out ${s.delay}s infinite`,
          opacity: 0.5,
        }} />
      ))}

      {/* Aurora bands */}
      <div style={{
        position: 'absolute', top: '18%', left: 0, right: 0, height: 160, opacity: 0.35,
        background: 'linear-gradient(90deg, transparent 0%, #5CE1FF 30%, #7A4BFF 55%, #3EE8B5 80%, transparent 100%)',
        filter: 'blur(40px)',
        animation: 'aurora-wave 7s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', top: '38%', left: 0, right: 0, height: 80, opacity: 0.18,
        background: 'linear-gradient(90deg, transparent 10%, #3EE8B5 40%, #7A4BFF 70%, transparent 90%)',
        filter: 'blur(30px)',
        animation: 'aurora-wave 9s ease-in-out 2s infinite',
      }} />

      {/* Far mountains */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%' }} viewBox="0 0 1600 400" preserveAspectRatio="none">
        <path d="M0 400 L0 240 L200 140 L400 220 L600 100 L800 200 L1000 140 L1200 240 L1400 160 L1600 220 L1600 400 Z" fill="#0A1428" opacity="0.9" />
      </svg>
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '25%' }} viewBox="0 0 1600 250" preserveAspectRatio="none">
        <path d="M0 250 L0 160 L300 100 L600 180 L900 120 L1200 200 L1600 140 L1600 250 Z" fill="#050A18" />
      </svg>

      {/* Header */}
      <div ref={headingRef} className="reveal reveal--fade" style={{ position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10 }}>
        <div className="font-mono-code" style={{ fontSize: 11, letterSpacing: '0.4em', color: 'rgba(92,225,255,0.65)', textTransform: 'uppercase' }}>— Chapter IV —</div>
        <div className="font-cinzel" style={{ fontSize: 'clamp(22px,3.5vw,38px)', letterSpacing: '0.15em', color: 'var(--paper)', textTransform: 'uppercase', marginTop: 4, textShadow: '0 0 24px #5CE1FF, 0 0 60px rgba(92,225,255,0.3)' }}>
          Skill Tree
        </div>
      </div>

      {/* Legend */}
      <div style={{ position: 'absolute', left: 20, bottom: 88, padding: '10px 14px', background: 'rgba(11,10,20,0.75)', border: '1px solid rgba(92,225,255,0.2)', borderRadius: 6, backdropFilter: 'blur(6px)', zIndex: 10 }}>
        {(Object.keys(CATEGORY_COLOR) as Category[]).map(k => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: CATEGORY_COLOR[k], boxShadow: `0 0 8px ${CATEGORY_COLOR[k]}` }} />
            <span className="font-mono-code" style={{ fontSize: 11, color: 'rgba(246,241,255,0.75)' }}>{CATEGORY_LABEL[k]}</span>
          </div>
        ))}
      </div>

      {/* Constellation SVG */}
      <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', opacity: inView ? 1 : 0, transition: 'opacity 0.8s', zIndex: 8 }}>
        <svg viewBox="0 0 1000 600" style={{ width: '90%', maxWidth: 1100, height: '70%', overflow: 'visible' }}>
          <defs>
            <filter id="sk-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {EDGES.map((e, i) => {
            const a = NODES.find(n => n.id === e.from)!
            const b = NODES.find(n => n.id === e.to)!
            const color = CATEGORY_COLOR[b.category]
            const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.08
            const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.08
            return (
              <path key={i} d={`M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`}
                stroke={color} strokeWidth="1.2" fill="none" opacity="0.4"
                style={{ filter: `drop-shadow(0 0 3px ${color})` }}
              />
            )
          })}
          {NODES.map(n => {
            const color = CATEGORY_COLOR[n.category]
            const isCore = n.id === 'core'
            return (
              <g key={n.id} style={{ cursor: 'pointer' }}>
                {isCore && (
                  <circle cx={n.x} cy={n.y} r={50} fill="none" stroke={color} strokeWidth={0.5} opacity={0.25}>
                    <animate attributeName="r" values="46;54;46" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite" />
                  </circle>
                )}
                <polygon points={hexPoints(n.x, n.y, isCore ? 32 : 20)} fill={`${color}18`} stroke={color} strokeWidth={isCore ? 2 : 1.4} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
                  {isCore && <animate attributeName="stroke-width" values="1.5;2.5;1.5" dur="2.5s" repeatCount="indefinite" />}
                </polygon>
                <polygon points={starPoints(n.x, n.y, isCore ? 12 : 7)} fill="#F6F1FF" opacity="0.95" style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
                  {isCore && <animate attributeName="fill" values={`${color};#ffffff;${color}`} dur="5s" repeatCount="indefinite" />}
                </polygon>
                <text x={n.x} y={n.y + (isCore ? 50 : 34)} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize={isCore ? 13 : 10} fill="#F3E7C8" letterSpacing="1" style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
                  {n.label.toUpperCase()}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Chapter label */}
      <div style={{ position: 'absolute', bottom: '2%', left: '5%', zIndex: 10 }}>
        <div className="font-cinzel" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--electric)', textTransform: 'uppercase', textShadow: '0 0 12px var(--electric)' }}>SKILL TREE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
          <div style={{ width: 24, height: 1, background: '#7A4BFF' }} />
          <span className="font-mono-code" style={{ color: '#7A4BFF', fontSize: 11, letterSpacing: '0.15em' }}>Chapter IV</span>
        </div>
      </div>
    </section>
  )
}
