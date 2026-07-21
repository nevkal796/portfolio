import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../lib/useScrollReveal'

interface Entry {
  org: string
  role: string
  period: string
  location?: string
  tag: string
  tagColor: string
  bullets: string[]
  tech: string[]
  sigil: string
}

const ENTRIES: Entry[] = [
  {
    org: 'PANTEX CORPORATION',
    role: 'Data Analyst · Apprentice of Numbers',
    period: 'May 2025 — Present',
    location: 'Amarillo, TX',
    tag: 'ACTIVE QUEST',
    tagColor: 'var(--jade)',
    sigil: 'P',
    bullets: [
      'Forged scalable Python pipelines consolidating 4 data sources across 12+ departments — banished manual toil and cut reporting time by 99%.',
      'Training an ML forecasting model (scikit-learn · Pandas) to divine attrition patterns across 4,500 souls; iterating on feature engineering and validation.',
      'Weaving an executive Tableau dashboard bound to live sources — real-time KPIs and trends for directors and senior leadership.',
    ],
    tech: ['Python', 'scikit-learn', 'Pandas', 'Tableau', 'SQL'],
  },
  {
    org: 'CREATOR CAMP',
    role: 'Lead Instructor',
    period: 'June 2025 — August 2025',
    location: 'Montrose, TX',
    tag: 'COMPLETED',
    tagColor: 'var(--amber)',
    sigil: 'CC',
    bullets: [
      'Led a team of 5 instructors teaching coding and technology to 200+ K–8 students across a full summer program.',
      'Taught Struckd game development and video editing software, guiding young creators from zero to finished projects.',
    ],
    tech: ['Struckd', 'Video Editing', 'Curriculum Design', 'Team Leadership'],
  },
]

export default function Chronicles() {
  const [sectionRef, inView] = useInView<HTMLElement>(0.15)

  return (
    <section ref={sectionRef} id="scene-chronicles" style={{
      width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden',
    }}>
      <style>{`
        @keyframes pd-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 0.9; transform: scale(1.1); }
        }
        @keyframes pd-flicker {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.2; }
        }
        @keyframes pd-drift-up {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.8; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>

      {/* Deep night sky */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 30%, #1B1638 0%, #0E0B1F 55%, #06050E 100%)',
      }} />

      <Stars />

      {/* Aurora glows */}
      <div style={{
        position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
        width: 900, height: 420, pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(122,75,255,0.18) 0%, transparent 65%)',
        filter: 'blur(20px)',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)',
        width: 700, height: 300, pointerEvents: 'none',
        background: 'radial-gradient(ellipse, rgba(92,225,255,0.1) 0%, transparent 70%)',
        filter: 'blur(30px)',
      }} />

      {/* Mountains */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '46%', pointerEvents: 'none' }}
        viewBox="0 0 1600 500" preserveAspectRatio="none">
        <path d="M0 500 L0 300 L180 180 L340 260 L500 140 L680 240 L820 170 L1000 260 L1180 160 L1340 250 L1520 180 L1600 240 L1600 500 Z" fill="#120E24" opacity="0.9" />
        <path d="M0 500 L0 360 L120 300 L280 340 L440 260 L600 320 L760 280 L940 340 L1120 280 L1300 340 L1480 300 L1600 340 L1600 500 Z" fill="#0A0716" />
      </svg>

      {/* Vignette */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* Header */}
      <div style={{ position: 'absolute', top: '5.5%', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center', whiteSpace: 'nowrap' }}>
        <Ornament />
        <div className="font-mono-code" style={{ color: 'var(--amber)', fontSize: 11, letterSpacing: '0.5em', marginTop: 8 }}>— Chapter III —</div>
        <div className="font-cinzel" style={{
          color: 'var(--paper)', fontSize: 'clamp(22px, 4vw, 48px)', letterSpacing: '0.28em', textTransform: 'uppercase', marginTop: 4,
          textShadow: '0 0 18px rgba(92,225,255,0.4), 0 0 42px rgba(122,75,255,0.3)',
        }}>Chronicles</div>
        <div className="font-mono-code" style={{ color: 'rgba(92,225,255,0.7)', fontSize: 10, letterSpacing: '0.4em', marginTop: 8 }}>FIELD ASSIGNMENTS · ACTIVE CAMPAIGNS</div>
        <div style={{ margin: '12px auto 0', height: 1, width: 224, background: 'linear-gradient(90deg, transparent, rgba(92,225,255,0.6), transparent)' }} />
      </div>

      {/* Timeline */}
      <div style={{
        position: 'absolute', top: '28%', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
        width: 'min(820px, 90vw)', zIndex: 10,
        opacity: inView ? 1 : 0, transition: 'opacity 0.7s',
        overflowY: 'auto', paddingRight: 8,
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(92,225,255,0.3) transparent',
      }}>
        {/* Rune spine */}
        <div style={{
          position: 'absolute', left: 28, top: 8, bottom: 8, width: 2,
          background: 'linear-gradient(180deg, transparent, rgba(92,225,255,0.7) 10%, rgba(122,75,255,0.6) 90%, transparent)',
          boxShadow: '0 0 8px rgba(92,225,255,0.5)',
        }} />
        {/* Tick marks */}
        <div style={{
          position: 'absolute', left: 22, top: 8, bottom: 8, width: 14, opacity: 0.4,
          backgroundImage: 'repeating-linear-gradient(180deg, transparent 0px 22px, rgba(92,225,255,0.6) 22px 23px)',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, paddingTop: 20 }}>
          {ENTRIES.map((e, i) => <ChronicleRow key={i} entry={e} index={i} />)}
        </div>
      </div>

      {/* Chapter label */}
      <div style={{ position: 'absolute', bottom: '3%', left: '4%', zIndex: 10 }}>
        <div className="font-cinzel theme-label" data-plain="Experience" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)', fontWeight: 700, letterSpacing: '0.35em', color: 'rgba(243,231,200,0.9)', textTransform: 'uppercase' }}>Chronicles</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <div style={{ width: 32, height: 1, background: 'var(--electric)' }} />
          <span className="font-mono-code" style={{ color: 'rgba(92,225,255,0.8)', fontSize: 10, letterSpacing: '0.3em' }}>CHAPTER · III</span>
        </div>
      </div>

      <Embers />
    </section>
  )
}

function ChronicleRow({ entry: e, index }: { entry: Entry; index: number }) {
  return (
    <div style={{ position: 'relative', display: 'flex', gap: 32 }}>
      {/* Node */}
      <div style={{ flexShrink: 0, width: 58, display: 'flex', justifyContent: 'center', paddingTop: 24 }}>
        <div style={{
          position: 'absolute', top: 16, width: 40, height: 40, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(92,225,255,0.45), transparent 70%)',
          animation: 'pd-pulse 2.5s ease-in-out infinite',
        }} />
        <div style={{
          position: 'relative', width: 24, height: 24, transform: 'rotate(45deg)',
          background: 'linear-gradient(135deg, var(--electric), var(--violet))',
          boxShadow: '0 0 14px rgba(92,225,255,0.8), inset 0 0 8px rgba(255,255,255,0.35)',
          border: '1px solid rgba(243,231,200,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="font-cinzel" style={{ transform: 'rotate(-45deg)', fontSize: 10, color: 'var(--ink)', fontWeight: 900 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Parchment card */}
      <div className="parchment-card" style={{
        flex: 1, padding: '20px 16px',
        transform: `rotate(${index % 2 === 0 ? -0.4 : 0.4}deg)`,
        overflow: 'visible',
      }}>
        {/* Corner nails */}
        {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map(pos => (
          <div key={pos} style={{
            position: 'absolute',
            top: pos.includes('top') ? 8 : undefined,
            bottom: pos.includes('bottom') ? 8 : undefined,
            left: pos.includes('left') ? 8 : undefined,
            right: pos.includes('right') ? 8 : undefined,
            width: 8, height: 8, borderRadius: '50%',
            background: '#8B7355',
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.6)',
          }} />
        ))}

        {/* Wax seal */}
        <div style={{
          position: 'absolute', left: -16, top: -16, width: 44, height: 44,
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(circle at 35% 30%, #E24C63, #A0243A 55%, #7A1F30 100%)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.55), inset 0 0 6px rgba(0,0,0,0.4)',
          transform: 'rotate(-8deg)', zIndex: 2,
        }}>
          <span className="font-cinzel" style={{ fontSize: 13, fontWeight: 900, color: 'var(--paper)', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{e.sigil}</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, paddingLeft: 24, marginBottom: 16 }}>
          <div>
            <div className="font-mono-code" style={{ fontSize: 9, letterSpacing: '0.3em', color: 'rgba(42,24,16,0.5)', marginBottom: 2 }}>
              ENTRY · {String(index + 1).padStart(3, '0')}
            </div>
            <div className="font-cinzel" style={{ color: 'var(--ink-text)', fontWeight: 700, fontSize: 'clamp(13px,1.4vw,18px)', letterSpacing: '0.14em', textTransform: 'uppercase', lineHeight: 1.2 }}>
              {e.org}
            </div>
            <div style={{ fontStyle: 'italic', fontSize: 13, color: '#6B4A2E', marginTop: 2, fontFamily: 'Georgia, serif' }}>{e.role}</div>
            {e.location && (
              <div className="font-mono-code" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(42,24,16,0.5)', marginTop: 4 }}>◈ {e.location}</div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <span className="font-mono-code" style={{
              fontSize: 9, letterSpacing: '0.25em', padding: '3px 10px',
              color: e.tagColor, border: `1.5px solid ${e.tagColor}`,
              background: 'rgba(62,232,181,0.08)', transform: 'rotate(3deg)',
              boxShadow: `0 0 12px rgba(62,232,181,0.3)`,
            }}>◆ {e.tag}</span>
            <span className="font-mono-code" style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(42,24,16,0.7)' }}>{e.period}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 24, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(42,24,16,0.4), transparent)' }} />
          <span style={{ color: 'rgba(42,24,16,0.4)', fontSize: 12 }}>✦</span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(270deg, rgba(42,24,16,0.4), transparent)' }} />
        </div>

        {/* Bullets */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {e.bullets.map((b, bi) => (
            <li key={bi} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: '#A0243A', fontSize: 10, marginTop: 3, flexShrink: 0 }}>◆</span>
              <span className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 12.5, lineHeight: 1.65 }}>{b}</span>
            </li>
          ))}
        </ul>

        {/* Equipment */}
        <div style={{ paddingLeft: 24, marginTop: 20 }}>
          <div className="font-mono-code" style={{ fontSize: 9, letterSpacing: '0.35em', color: 'rgba(42,24,16,0.55)', marginBottom: 8 }}>— EQUIPMENT EQUIPPED —</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {e.tech.map(t => (
              <span key={t} className="font-mono-code" style={{
                fontSize: 10, letterSpacing: '0.1em', padding: '2px 8px',
                color: 'var(--ink-text)', borderRadius: 2,
                border: '1px solid rgba(42,24,16,0.35)',
                background: 'rgba(42,24,16,0.06)',
              }}>⚔ {t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Ornament() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <div style={{ height: 1, width: 56, background: 'linear-gradient(90deg, transparent, rgba(255,179,71,0.7))' }} />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="var(--amber)" opacity="0.9" />
      </svg>
      <div style={{ height: 1, width: 56, background: 'linear-gradient(270deg, transparent, rgba(255,179,71,0.7))' }} />
    </div>
  )
}

function Stars() {
  const stars = useRef<{ x: number; y: number; s: number; d: number }[] | null>(null)
  if (!stars.current) {
    stars.current = Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 65,
      s: Math.random() * 1.8 + 0.4,
      d: Math.random() * 3,
    }))
  }
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {stars.current.map((st, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${st.x}%`, top: `${st.y}%`,
          width: st.s, height: st.s, borderRadius: '50%',
          background: i % 7 === 0 ? 'var(--electric)' : 'var(--paper)',
          boxShadow: i % 7 === 0 ? '0 0 6px var(--electric)' : '0 0 3px var(--paper)',
          animationDelay: `${st.d}s`, opacity: 0.8,
          animation: `pd-flicker ${2 + st.d}s ease-in-out ${st.d}s infinite`,
        }} />
      ))}
    </div>
  )
}

function Embers() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          bottom: -10,
          width: 3, height: 3, borderRadius: '50%',
          background: i % 3 === 0 ? 'var(--electric)' : 'var(--amber)',
          boxShadow: `0 0 6px ${i % 3 === 0 ? 'var(--electric)' : 'var(--amber)'}`,
          animation: `pd-drift-up ${10 + Math.random() * 10}s linear ${Math.random() * 5}s infinite`,
          opacity: 0.7,
        }} />
      ))}
    </div>
  )
}
