import { useEffect, useState } from 'react'
import { useProfile } from '../../lib/useLiveData'
import { useScrollReveal } from '../../lib/useScrollReveal'

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 83.7) % 60,
  s: 0.4 + (i % 4) * 0.37,
  o: 0.3 + (i % 7) * 0.1,
  d: (i * 0.29) % 3,
}))

const FIREFLIES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 5 + (i * 89) % 90,
  y: 40 + (i * 31) % 45,
  dur: 3 + (i * 0.7) % 3,
  delay: (i * 0.4) % 3,
}))

export default function SpawnPoint() {
  const profile = useProfile()
  const [typed, setTyped] = useState('')
  const titleRef = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })

  useEffect(() => {
    const name = profile.name
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(name.slice(0, i))
      if (i >= name.length) clearInterval(id)
    }, 90)
    return () => clearInterval(id)
  }, [profile.name])

  return (
    <section id="scene-spawn" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Sky gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #0B0A14 0%, #1A0F2E 40%, #2A1B4A 70%, #4B1D5C 100%)' }} />

      {/* Stars */}
      {STARS.map(s => (
        <div key={s.id} style={{
          position: 'absolute', borderRadius: '50%', background: '#fff',
          width: s.s, height: s.s,
          left: `${s.x}%`, top: `${s.y}%`,
          opacity: s.o,
          animation: `twinkle ${1.5 + s.d}s ease-in-out ${s.d}s infinite alternate`,
        }} />
      ))}

      {/* Big pale moon */}
      <div style={{
        position: 'absolute', right: '18%', top: '14%',
        width: 160, height: 160, borderRadius: '50%',
        background: '#F6F1FF', opacity: 0.9, filter: 'blur(1px)',
        boxShadow: '0 0 80px 20px rgba(246,241,255,0.25)',
      }} />

      {/* Pink crescent moon */}
      <div style={{
        position: 'absolute', left: '22%', top: '26%',
        width: 80, height: 80, borderRadius: '50%',
        background: 'radial-gradient(circle at 65% 50%, transparent 42%, #FF3EA5 44%)',
        filter: 'blur(0.5px) drop-shadow(0 0 40px #FF3EA5)',
        opacity: 0.7,
      }} />

      {/* Shooting star */}
      <div style={{
        position: 'absolute', top: '18%', right: 0,
        height: 2, width: 160,
        background: 'linear-gradient(to left, #fff, transparent)',
        animation: 'pd-shooting-star 6s ease-in infinite',
        animationDelay: '2s',
      }} />

      {/* Far mountains */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '45%' }} viewBox="0 0 1600 400" preserveAspectRatio="none">
        <path d="M0 400 L0 260 L120 160 L280 220 L420 120 L560 200 L720 140 L880 210 L1040 100 L1200 190 L1360 150 L1500 220 L1600 180 L1600 400 Z" fill="#120C22" />
      </svg>

      {/* Distant neon tower */}
      <div style={{
        position: 'absolute', bottom: '35%', right: '8%',
        width: 6, height: 96,
        background: 'linear-gradient(to top, transparent, #FF3EA5cc, #FF3EA5)',
        boxShadow: '0 0 20px #FF3EA5',
        animation: 'pulse 2s ease-in-out infinite',
      }} />

      {/* Mid cliff */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '32%' }} viewBox="0 0 1600 300" preserveAspectRatio="none">
        <path d="M0 300 L0 180 L200 150 L420 190 L680 160 L900 200 L1200 170 L1400 210 L1600 190 L1600 300 Z" fill="#0E0B1C" />
      </svg>

      {/* Torii gate silhouette */}
      <svg style={{ position: 'absolute', bottom: '18%', left: '8%', height: 160, width: 128 }} viewBox="0 0 120 160">
        <rect x="14" y="30" width="8" height="120" fill="#1a0f2e" />
        <rect x="98" y="30" width="8" height="120" fill="#1a0f2e" />
        <rect x="4" y="24" width="112" height="10" fill="#1a0f2e" />
        <rect x="10" y="12" width="100" height="10" fill="#1a0f2e" />
        <rect x="0" y="8" width="120" height="6" fill="#1a0f2e" />
        <rect x="14" y="30" width="8" height="120" fill="none" stroke="#FF3EA5" strokeWidth="0.5" opacity="0.4" />
        <rect x="98" y="30" width="8" height="120" fill="none" stroke="#FF3EA5" strokeWidth="0.5" opacity="0.4" />
      </svg>

      {/* Foreground grass */}
      <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '18%' }} viewBox="0 0 1600 160" preserveAspectRatio="none">
        <path d="M0 160 L0 80 Q100 60 220 80 Q340 60 500 90 Q660 70 820 100 Q980 80 1140 100 Q1300 80 1460 100 L1600 90 L1600 160 Z" fill="#08060F" />
      </svg>

      {/* Save crystal */}
      <div style={{ position: 'absolute', bottom: '16%', right: '24%' }}>
        <div style={{
          width: 32, height: 64, transform: 'rotate(45deg)',
          background: 'linear-gradient(135deg, #FF3EA5, #7A4BFF)',
          boxShadow: '0 0 30px #FF3EA5',
          clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
      </div>

      {/* Fireflies */}
      {FIREFLIES.map(f => (
        <div key={f.id} style={{
          position: 'absolute', width: 4, height: 4, borderRadius: '50%',
          background: '#FFB347', boxShadow: '0 0 8px #FFB347',
          left: `${f.x}%`, top: `${f.y}%`,
          animation: `firefly-float ${f.dur}s ease-in-out ${f.delay}s infinite`,
        }} />
      ))}

      {/* Main content block — vertically centered */}
      <div ref={titleRef} className="reveal reveal--fade" style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center', zIndex: 5, width: '100%', padding: '0 24px',
      }}>
        <div className="font-mono-code" style={{ fontSize: 11, letterSpacing: '0.4em', color: 'rgba(92,225,255,0.7)', textTransform: 'uppercase', marginBottom: 16 }}>
          — Chapter I · Spawn Point —
        </div>
        <h1 className="font-cinzel" style={{
          fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 700,
          letterSpacing: '0.1em', color: 'var(--paper)',
          textShadow: '0 0 30px #FF3EA5, 0 0 60px rgba(255,62,165,0.3)',
          textTransform: 'uppercase', whiteSpace: 'nowrap', margin: 0,
        }}>
          {typed}
          <span style={{
            display: 'inline-block', borderRight: '2px solid #FF3EA5',
            marginLeft: 4, height: '0.9em', verticalAlign: 'middle',
            animation: 'blink-cursor 1s steps(1) infinite',
          }} />
        </h1>
        <div className="font-mono-code" style={{ marginTop: 4, fontSize: 'clamp(11px, 1.2vw, 15px)', color: 'rgba(246,241,255,0.65)', letterSpacing: '0.2em' }}>
          &lt;{profile.classTitle} · LVL 3&gt;
        </div>

        {/* Divider */}
        <div style={{ margin: '28px auto', width: 120, height: 1, background: 'linear-gradient(90deg, transparent, #FF3EA5, transparent)' }} />

        {/* Targeting tags — spaced out */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '10px 0', marginBottom: 12 }}>
          {['Data Science', 'Machine Learning', 'AI', 'Full Stack'].map((tag, i, arr) => (
            <span key={tag} className="font-grotesk" style={{ color: 'rgba(92,225,255,0.9)', fontSize: 'clamp(12px, 1.4vw, 17px)', letterSpacing: '0.12em' }}>
              {tag}{i < arr.length - 1 && <span style={{ color: 'rgba(255,62,165,0.5)', margin: '0 14px' }}>·</span>}
            </span>
          ))}
        </div>
        <div style={{ marginBottom: 36 }}>
          <span className="font-grotesk" style={{
            color: 'rgba(62,232,181,0.95)', fontSize: 'clamp(11px, 1.3vw, 16px)',
            letterSpacing: '0.18em', fontWeight: 600,
            textShadow: '0 0 20px rgba(62,232,181,0.4)',
          }}>
            ▸ OPEN TO SWE INTERNSHIPS
          </span>
        </div>

        {/* View Character button */}
        <button
          onClick={() => document.getElementById('scene-village')?.scrollIntoView({ behavior: 'smooth' })}
          className="font-cinzel"
          style={{
            background: 'rgba(122,75,255,0.15)',
            border: '1px solid rgba(122,75,255,0.6)',
            color: 'rgba(246,241,255,0.9)',
            padding: '10px 28px',
            fontSize: 11, letterSpacing: '0.2em',
            cursor: 'pointer', borderRadius: 3,
            boxShadow: '0 0 20px rgba(122,75,255,0.2)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = 'rgba(122,75,255,0.35)'; (e.target as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(122,75,255,0.5)' }}
          onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'rgba(122,75,255,0.15)'; (e.target as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(122,75,255,0.2)' }}
        >
          ⚔ VIEW CHARACTER
        </button>
      </div>

      {/* Chapter label bottom-left */}
      <div style={{ position: 'absolute', bottom: '7%', left: '5%', zIndex: 10 }}>
        <div className="font-cinzel" style={{ fontSize: 'clamp(13px, 1.6vw, 20px)', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--paper)', textTransform: 'uppercase' }}>
          SPAWN POINT
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <div style={{ width: 24, height: 1, background: '#FF3EA5' }} />
          <span className="font-grotesk" style={{ color: '#FF3EA5', fontSize: 11, letterSpacing: '0.15em' }}>Chapter I</span>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position: 'absolute', bottom: '2%', left: '50%', transform: 'translateX(-50%)', zIndex: 10, animation: 'pulse 2s ease-in-out infinite' }}>
        <div className="font-mono-code" style={{ color: 'var(--bone)', fontSize: 10, letterSpacing: '0.25em', opacity: 0.5 }}>
          ↓ SCROLL TO EXPLORE
        </div>
      </div>
    </section>
  )
}
