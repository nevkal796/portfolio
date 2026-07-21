import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../lib/useLiveData'
import { useScrollReveal, useInView } from '../../lib/useScrollReveal'
import { useIsMobile } from '../../lib/useIsMobile'
import type { Project } from '../../data/types'

const CATEGORY_COLORS: Record<string, string> = {
  React: '#FF3EA5', TypeScript: '#5CE1FF', JavaScript: '#FFB347',
  Python: '#3EE8B5', 'Node.js': '#7A4BFF', PostgreSQL: '#5CE1FF',
  FastAPI: '#3EE8B5', Docker: '#5CE1FF', GSAP: '#FF3EA5',
  Tailwind: '#5CE1FF', MongoDB: '#3EE8B5', HTML: '#FF6A3D', CSS: '#7A4BFF',
  'AWS Lambda': '#FF9A4D', DynamoDB: '#3EE8B5', 'API Gateway': '#5CE1FF',
  Redis: '#FF3EA5', 'Next.js': '#5CE1FF', Supabase: '#3EE8B5', Stripe: '#7A4BFF',
  NextAuth: '#5CE1FF', FinBERT: '#3EE8B5', Pandas: '#5CE1FF', 'Plotly Dash': '#FF3EA5',
  'React Native': '#FF3EA5', 'OpenAI': '#3EE8B5', 'Anthropic API': '#FF3EA5',
  k6: '#FFB347', 'REST API': '#7A4BFF',
}

const DIFFICULTY_STARS = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n)

const STATUS_STYLE: Record<Project['status'], { color: string; bg: string }> = {
  COMPLETED: { color: '#3EE8B5', bg: '#3EE8B511' },
  IN_PROGRESS: { color: '#FFB347', bg: '#FFB34711' },
  ARCHIVED: { color: '#8888aa', bg: '#8888aa11' },
}

export default function QuestLog() {
  const projects = useProjects()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const headingRef = useScrollReveal<HTMLDivElement>()
  const [cardsRef, cardsVisible] = useInView<HTMLDivElement>(0.1)
  const signRef = useScrollReveal<HTMLDivElement>()
  const sorted = projects.filter(p => p.featured).sort((a, b) => a.sortOrder - b.sortOrder)
  const featured = isMobile ? sorted.slice(0, 1) : sorted.slice(0, 3)

  return (
    <section id="scene-quests" style={{
      width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden',
      background: '#1a0e08',
    }}>

      {/* Wood plank wall */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          repeating-linear-gradient(180deg, rgba(90,55,25,0.55) 0px, rgba(70,40,15,0.4) 18px, rgba(50,28,10,0.5) 20px, rgba(80,48,20,0.35) 38px, rgba(60,35,12,0.45) 40px),
          repeating-linear-gradient(90deg, transparent 0px, rgba(0,0,0,0.08) 200px, transparent 202px, rgba(0,0,0,0.06) 400px)
        `,
        zIndex: 1,
      }} />

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Shoji screen panels */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8%', background: 'linear-gradient(90deg, rgba(180,130,70,0.25), transparent)', borderRight: '2px solid rgba(160,110,50,0.3)', zIndex: 3 }}>
        {Array.from({ length: 8 }, (_, i) => <div key={i} style={{ position: 'absolute', top: `${i * 12.5}%`, left: 0, right: 0, height: 1, background: 'rgba(160,110,50,0.3)' }} />)}
      </div>
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8%', background: 'linear-gradient(270deg, rgba(180,130,70,0.25), transparent)', borderLeft: '2px solid rgba(160,110,50,0.3)', zIndex: 3 }}>
        {Array.from({ length: 8 }, (_, i) => <div key={i} style={{ position: 'absolute', top: `${i * 12.5}%`, left: 0, right: 0, height: 1, background: 'rgba(160,110,50,0.3)' }} />)}
      </div>

      {/* Cork notice board backing */}
      <div style={{
        position: 'absolute', top: '14%', left: '9%', right: '9%', bottom: '18%',
        background: 'linear-gradient(135deg, #4a2e10, #3a2008 40%, #4e3214 70%, #3a2008)',
        border: '6px solid #6b4020', borderRadius: 4,
        boxShadow: '0 0 0 2px #2a1408, 0 8px 40px rgba(0,0,0,0.7), inset 0 0 60px rgba(0,0,0,0.4)',
        zIndex: 4,
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(200,160,80,0.08) 2px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(160,120,60,0.06) 3px, transparent 3px)', backgroundSize: '40px 40px, 60px 60px' }} />
      </div>

      {/* Torches */}
      <Torch x={9.5} />
      <Torch x={90} />

      {/* Quest cards */}
      <div ref={cardsRef} style={{
        position: 'absolute', top: isMobile ? '15%' : '17%', left: '11%', right: '11%', bottom: '20%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 20, zIndex: 10,
        opacity: cardsVisible ? 1 : 0, transition: 'opacity 0.6s',
      }}>
        {featured.map((p, i) => (
          <QuestCard key={p.id} project={p} rotateOffset={isMobile ? 0 : [-2.5, 0.5, -1.5][i % 3]} index={i} isMobile={isMobile} />
        ))}
      </div>

      {/* Section title */}
      <div ref={headingRef} className="reveal reveal--slide-up" style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 5 }}>
        <div className="font-cinzel" style={{ color: 'var(--paper)', fontSize: 'clamp(16px, 2.5vw, 28px)', fontWeight: 700, letterSpacing: '0.2em', textShadow: '0 0 20px var(--amber), 0 2px 0 rgba(0,0,0,0.8)' }}>
          QUEST LOG
        </div>
        <div className="font-grotesk" style={{ color: '#FFB34788', fontSize: 10, letterSpacing: '0.2em', marginTop: 3 }}>COMPLETED · ACTIVE · ARCHIVED</div>
      </div>

      {/* Explore more sign */}
      <div ref={signRef} className="reveal reveal--fade" style={{ position: 'absolute', bottom: '9%', left: '50%', transform: 'translateX(-50%)', cursor: 'pointer', zIndex: 10 }} onClick={() => navigate('/quests')}>
        <div style={{ padding: '9px 22px', background: '#2A1808', border: '2px solid #8B5A2A', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
          <span className="font-cinzel" style={{ color: 'var(--amber)', fontSize: 13, letterSpacing: '0.15em' }}>EXPLORE MORE QUESTS →</span>
        </div>
      </div>

      {/* Chapter label */}
      <div style={{ position: 'absolute', bottom: '2%', left: '5%', zIndex: 10 }}>
        <div className="font-cinzel theme-label" data-plain="Projects" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--paper)', textTransform: 'uppercase' }}>QUEST LOG</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
          <div style={{ width: 24, height: 1, background: '#FF9A4D' }} />
          <span className="font-grotesk" style={{ color: '#FF9A4D', fontSize: 11, letterSpacing: '0.15em' }}>Chapter IV</span>
        </div>
      </div>
    </section>
  )
}

function QuestCard({ project: p, rotateOffset, index, isMobile }: { project: Project; rotateOffset: number; index: number; isMobile?: boolean }) {
  const navigate = useNavigate()
  const status = STATUS_STYLE[p.status]
  return (
    <div
      onClick={() => navigate(`/quests/${p.id}`, { state: { from: '/' } })}
      style={{
        flex: '0 0 auto',
        width: isMobile ? 'min(300px, 80vw)' : 'clamp(200px, 26vw, 300px)',
        minHeight: isMobile ? 'auto' : 380,
        background: 'var(--paper)',
        borderRadius: 3,
        position: 'relative',
        cursor: 'pointer',
        transform: `rotate(${rotateOffset}deg)`,
        boxShadow: '0 6px 28px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,107,68,0.4)',
        transition: `transform 0.3s ${index * 90}ms, box-shadow 0.3s`,
      }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'rotate(0deg) translateY(-10px) scale(1.03)'; el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.8), 0 0 20px rgba(255,154,77,0.3)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = `rotate(${rotateOffset}deg)`; el.style.boxShadow = '0 6px 28px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,107,68,0.4)' }}
    >
      <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', width: 26, height: 26, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #e03060, #B8324B)', border: '2px solid #8a1f33', boxShadow: '0 0 10px #B8324B88', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: '#8B6B44', border: '1px solid #5C3A1E', zIndex: 3 }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(139,107,68,0.07) 22px, rgba(139,107,68,0.07) 23px)', pointerEvents: 'none', borderRadius: 3 }} />
      <div style={{ padding: '22px 18px 18px' }}>
        <div className="font-mono-code" style={{ color: '#8B6B44', fontSize: 10, letterSpacing: '0.15em' }}>QUEST · #{String(p.questNumber).padStart(3, '0')}</div>
        <div style={{ borderBottom: '1px solid #8B6B4466', margin: '5px 0 10px' }} />
        <div className="font-cinzel" style={{ color: 'var(--ink-text)', fontSize: 15, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>{p.title}</div>
        <div className="font-vt323" style={{ color: '#8B6B44', fontSize: 17, marginBottom: 6 }}>Difficulty: {DIFFICULTY_STARS(p.difficulty)}</div>
        <div style={{ marginBottom: 10 }}>
          <span className="font-mono-code" style={{ fontSize: 10, padding: '3px 8px', background: status.bg, color: status.color, border: `1px solid ${status.color}44`, borderRadius: 2 }}>
            {p.status.replace('_', ' ')}
          </span>
        </div>
        <p className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 12, lineHeight: 1.6, marginBottom: 10 }}>"{p.description}"</p>
        <div className="font-grotesk" style={{ color: '#8B6B44', fontSize: 10, letterSpacing: '0.1em', marginBottom: 6 }}>─── EQUIPMENT USED ───</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
          {p.techTags.map(t => (
            <span key={t} style={{ fontSize: 10, padding: '2px 7px', background: `${CATEGORY_COLORS[t] ?? '#8888aa'}22`, color: CATEGORY_COLORS[t] ?? '#8888aa', border: `1px solid ${CATEGORY_COLORS[t] ?? '#8888aa'}44`, borderRadius: 2 }} className="font-mono-code">⚔ {t}</span>
          ))}
        </div>
        <div className="font-cinzel" style={{ color: 'var(--amber)', fontSize: 10, letterSpacing: '0.1em', marginTop: 6 }}>Read quest log →</div>
      </div>
    </div>
  )
}

function Torch({ x }: { x: number }) {
  return (
    <div style={{ position: 'absolute', top: '10%', left: `${x}%`, zIndex: 5 }}>
      <div style={{ width: 8, height: 40, background: '#5C3A1E', margin: '0 auto', borderRadius: 2 }} />
      <div style={{ width: 14, height: 18, background: 'radial-gradient(ellipse at 50% 80%, #FF6A3D, #FFB34788)', borderRadius: '50% 50% 20% 20%', margin: '0 auto', boxShadow: '0 0 20px 8px #FF6A3D55', animation: 'torch-flicker 0.18s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', bottom: -6, left: -6, right: -6, height: 30, background: 'radial-gradient(ellipse, #FF6A3D22, transparent)', filter: 'blur(8px)' }} />
    </div>
  )
}
