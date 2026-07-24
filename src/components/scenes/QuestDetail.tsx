import { useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useProjects } from '../../lib/useLiveData'
import { useScrollReveal } from '../../lib/useScrollReveal'
import type { Project } from '../../data/types'

const STATUS_STYLE: Record<Project['status'], { color: string; label: string }> = {
  COMPLETED: { color: '#3EE8B5', label: 'COMPLETED' },
  IN_PROGRESS: { color: '#FFB347', label: 'IN PROGRESS' },
  ARCHIVED: { color: '#8888aa', label: 'ARCHIVED' },
}

const CATEGORY_COLORS: Record<string, string> = {
  React: '#FF3EA5', TypeScript: '#5CE1FF', JavaScript: '#FFB347',
  Python: '#3EE8B5', 'Node.js': '#7A4BFF', PostgreSQL: '#5CE1FF',
  FastAPI: '#3EE8B5', Docker: '#5CE1FF', GSAP: '#FF3EA5',
  Tailwind: '#5CE1FF', MongoDB: '#3EE8B5', HTML: '#FF6A3D', CSS: '#7A4BFF',
  'AWS Lambda': '#FF9A4D', DynamoDB: '#3EE8B5', 'API Gateway': '#5CE1FF',
  Redis: '#FF3EA5', 'Next.js': '#5CE1FF', Supabase: '#3EE8B5', Stripe: '#7A4BFF',
  NextAuth: '#5CE1FF', FinBERT: '#3EE8B5', Pandas: '#5CE1FF', 'Plotly Dash': '#FF3EA5',
  'React Native': '#FF3EA5', OpenAI: '#3EE8B5', 'Anthropic API': '#FF3EA5',
  k6: '#FFB347', 'REST API': '#7A4BFF',
}

const SCENE_ACCENTS: Record<number, { glow: string; bar: string }> = {
  1: { glow: '#FF9A4D', bar: 'linear-gradient(90deg, #FF6A3D, #FF9A4D)' },
  2: { glow: '#3EE8B5', bar: 'linear-gradient(90deg, #3EE8B5, #5CE1FF)' },
  3: { glow: '#FFB347', bar: 'linear-gradient(90deg, #FFB347, #FF9A4D)' },
  4: { glow: '#7A4BFF', bar: 'linear-gradient(90deg, #7A4BFF, #5CE1FF)' },
  5: { glow: '#FF3EA5', bar: 'linear-gradient(90deg, #FF3EA5, #7A4BFF)' },
  6: { glow: '#5CE1FF', bar: 'linear-gradient(90deg, #5CE1FF, #7A4BFF)' },
}

const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 137.5) % 100,
  y: (i * 83.7) % 100,
  s: 0.5 + (i % 3) * 0.5,
  delay: (i * 0.31) % 3,
  dur: 1.5 + (i % 5) * 0.5,
}))

function Section({ title, children, delay = 0, accentColor }: { title: string; children: React.ReactNode; delay?: number; accentColor: string }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="reveal reveal--slide-up" style={{ transitionDelay: `${delay}ms`, marginBottom: 28 }}>
      <div className="font-cinzel" style={{ color: accentColor, fontSize: 10, letterSpacing: '0.25em', marginBottom: 10, opacity: 0.8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 20, height: 1, background: accentColor, opacity: 0.4 }} />
        {title}
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accentColor}44, transparent)` }} />
      </div>
      <div className="font-grotesk" style={{ color: 'rgba(220,210,240,0.85)', fontSize: 13, lineHeight: 1.85 }}>{children}</div>
    </div>
  )
}

export default function QuestDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const projects = useProjects()
  const project = projects.find(p => p.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const headerRef = useScrollReveal<HTMLDivElement>()

  const from = (location.state as { from?: string })?.from ?? '/quests'
  const backLabel = from === '/quests' ? '← Quest Archive' : '← Quest Log'
  const handleBack = () => from === '/quests' ? navigate('/quests') : navigate('/?scene=quests')

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', background: '#0B0A14', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'auto' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="font-cinzel" style={{ color: 'var(--paper)', fontSize: 24, letterSpacing: '0.2em' }}>QUEST NOT FOUND</div>
          <div className="font-grotesk" style={{ color: 'var(--bone)', fontSize: 12, marginTop: 8 }}>This scroll does not exist.</div>
          <button onClick={() => navigate('/quests')} className="font-cinzel" style={{ marginTop: 20, background: 'rgba(92,225,255,0.06)', border: '1px solid rgba(92,225,255,0.3)', color: 'var(--electric)', padding: '8px 20px', cursor: 'pointer', borderRadius: 3 }}>
            Return to Archive
          </button>
        </div>
      </div>
    )
  }

  const status = STATUS_STYLE[project.status]
  const d = project.detail
  const accent = SCENE_ACCENTS[project.questNumber] ?? SCENE_ACCENTS[1]

  return (
    <div style={{ minHeight: '100vh', background: '#0B0A14', cursor: 'auto', position: 'relative', overflow: 'hidden' }}>

      {/* ── AMBIENT BACKGROUND ── */}
      {/* Accent glow blob */}
      <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: `radial-gradient(ellipse, ${accent.glow}0f 0%, transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />
      {/* Stars */}
      {STARS.map((s, i) => (
        <div key={i} style={{
          position: 'fixed', borderRadius: '50%', background: '#fff',
          width: s.s, height: s.s,
          left: `${s.x}%`, top: `${s.y}%`,
          animation: `sparkle-pulse ${s.dur}s ease-in-out ${s.delay}s infinite`,
          opacity: 0.35, pointerEvents: 'none', zIndex: 0,
        }} />
      ))}
      {/* Grid overlay */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 }} />

      {/* ── HUD NAV BAR ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(11,10,20,0.85)', borderBottom: `1px solid ${accent.glow}22`,
        backdropFilter: 'blur(12px)',
        padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button onClick={handleBack} className="font-cinzel"
          style={{ background: 'rgba(92,225,255,0.06)', border: '1px solid rgba(92,225,255,0.25)', color: 'var(--electric)', padding: '7px 14px', cursor: 'pointer', borderRadius: 3, fontSize: 10, letterSpacing: '0.12em', transition: 'background 0.2s, border-color 0.2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(92,225,255,0.12)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(92,225,255,0.5)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(92,225,255,0.06)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(92,225,255,0.25)' }}
        >
          {backLabel}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="font-vt323" style={{ fontSize: 18, color: accent.glow }}>{'★'.repeat(project.difficulty)}{'☆'.repeat(5 - project.difficulty)}</span>
          <span className="font-mono-code" style={{ fontSize: 10, color: accent.glow, letterSpacing: '0.15em', opacity: 0.7 }}>
            QUEST · #{String(project.questNumber).padStart(3, '0')}
          </span>
        </div>
      </div>

      {/* ── CONTENT COLUMN (page-entry animation) ── */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 820, margin: '0 auto', padding: '0 28px 80px', animation: 'quest-detail-enter 0.45s cubic-bezier(0.22,1,0.36,1) both' }}>

        {/* Title block */}
        <div ref={headerRef} className="reveal reveal--fade" style={{ padding: '36px 0 28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
            <span className="font-mono-code" style={{ fontSize: 10, padding: '3px 10px', background: `${status.color}14`, color: status.color, border: `1px solid ${status.color}33`, borderRadius: 2, letterSpacing: '0.1em' }}>
              {status.label}
            </span>
          </div>
          <h1 className="font-cinzel" style={{ color: 'var(--paper)', fontSize: 'clamp(22px, 3.5vw, 38px)', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.15, margin: '0 0 14px', textShadow: `0 0 40px ${accent.glow}55` }}>
            {project.title}
          </h1>
          <div style={{ width: 64, height: 3, background: accent.bar, borderRadius: 2, boxShadow: `0 0 12px ${accent.glow}88`, marginBottom: 16 }} />
          <p className="font-grotesk" style={{ color: 'rgba(220,210,240,0.7)', fontSize: 13, lineHeight: 1.8, margin: 0 }}>
            {project.description}
          </p>
        </div>

        {/* Link buttons */}
        {(project.githubUrl || project.demoUrl) && (
          <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap' }}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="font-cinzel"
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', background: 'rgba(92,225,255,0.06)', border: '1px solid rgba(92,225,255,0.25)', color: 'var(--electric)', borderRadius: 3, textDecoration: 'none', fontSize: 11, letterSpacing: '0.12em', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(92,225,255,0.12)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(92,225,255,0.06)')}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                View on GitHub
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="font-cinzel"
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', background: `${accent.glow}0f`, border: `1px solid ${accent.glow}44`, color: accent.glow, borderRadius: 3, textDecoration: 'none', fontSize: 11, letterSpacing: '0.12em', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = `${accent.glow}1a`)}
                onMouseLeave={e => (e.currentTarget.style.background = `${accent.glow}0f`)}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
              </a>
            )}
          </div>
        )}

        {/* ── MISSION BRIEFING PANEL ── */}
        {d && (
          <div style={{
            background: 'rgba(11,10,20,0.8)',
            border: `1px solid ${accent.glow}22`,
            borderLeft: `3px solid ${accent.glow}`,
            borderRadius: 4,
            padding: '32px 36px',
            boxShadow: `0 0 40px ${accent.glow}08, 0 8px 48px rgba(0,0,0,0.5)`,
            position: 'relative',
            marginBottom: 36,
            backdropFilter: 'blur(8px)',
          }}>
            {/* Scanline texture */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(255,255,255,0.015) 22px, rgba(255,255,255,0.015) 23px)', pointerEvents: 'none', borderRadius: 4 }} />
            {/* Corner brackets */}
            <div style={{ position: 'absolute', top: 10, right: 14, fontFamily: 'monospace', fontSize: 10, color: `${accent.glow}44`, letterSpacing: '0.1em' }}>MISSION · BRIEF</div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <Section title="THE PROBLEM" delay={0} accentColor={accent.glow}>{d.problem}</Section>
              <Section title="THE APPROACH" delay={60} accentColor={accent.glow}>{d.approach}</Section>
              <Section title="TRIALS FACED" delay={120} accentColor={accent.glow}>{d.trials}</Section>
              <Section title="THE FINDINGS" delay={180} accentColor={accent.glow}>{d.findings}</Section>

              <div className="font-cinzel" style={{ color: `${accent.glow}99`, fontSize: 10, letterSpacing: '0.25em', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 1, background: accent.glow, opacity: 0.4 }} />
                FULL STACK
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accent.glow}44, transparent)` }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {d.stack.map(t => {
                  const key = t.split(' ')[0].replace(/[()]/g, '')
                  const color = CATEGORY_COLORS[key] ?? '#8888aa'
                  return <span key={t} className="font-mono-code" style={{ fontSize: 10, padding: '3px 8px', background: `${color}14`, color, border: `1px solid ${color}33`, borderRadius: 2 }}>⚔ {t}</span>
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── IMAGE ── */}
        {project.imageUrl ? (
          <div style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${accent.glow}33`, boxShadow: `0 0 40px ${accent.glow}18` }}>
            <img src={project.imageUrl} alt={project.title} style={{ width: '100%', display: 'block', maxHeight: 480, objectFit: 'cover', objectPosition: 'center' }} />
          </div>
        ) : (
          <div style={{
            borderRadius: 6, overflow: 'hidden', height: 200,
            background: `radial-gradient(ellipse at 40% 50%, ${accent.glow}14 0%, transparent 65%), linear-gradient(160deg, #0B0A14 0%, #12102a 60%, #0B0A14 100%)`,
            border: `1px solid ${accent.glow}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
          }}>
            <div style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)', backgroundSize: '32px 32px', position: 'absolute', inset: 0 }} />
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div className="font-vt323" style={{ color: `${accent.glow}55`, fontSize: 40 }}>{'★'.repeat(project.difficulty)}</div>
              <div className="font-cinzel" style={{ color: `${accent.glow}33`, fontSize: 10, letterSpacing: '0.3em', marginTop: 8 }}>NO IMAGE UPLOADED</div>
            </div>
          </div>
        )}

        {/* Tech tags footer */}
        <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.techTags.map(t => {
            const color = CATEGORY_COLORS[t] ?? '#8888aa'
            return <span key={t} className="font-mono-code" style={{ fontSize: 9, padding: '2px 7px', background: `${color}14`, color, border: `1px solid ${color}33`, borderRadius: 2 }}>⚔ {t}</span>
          })}
        </div>

      </div>
    </div>
  )
}
