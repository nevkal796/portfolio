import { useProfile } from '../../lib/useLiveData'
import { Character } from '../Character'
import { useInView } from '../../lib/useScrollReveal'
import { useIsMobile } from '../../lib/useIsMobile'

const BLOSSOMS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: (i * 47) % 100,
  delay: (i * 0.4) % 5,
  dur: 4 + (i * 0.6) % 4,
  size: 4 + (i % 4) * 2,
  drift: -20 + (i % 5) * 12,
}))

const FIREFLIES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 5 + (i * 91) % 85,
  bottom: 30 + (i * 17) % 15,
  delay: (i * 0.7) % 5,
  dur: 3 + (i * 0.9) % 4,
}))

export default function Village() {
  const profile = useProfile()
  const isMobile = useIsMobile()
  const [sectionRef, inView] = useInView<HTMLElement>(0.25)

  return (
    <section ref={sectionRef} id="scene-village" style={{
      width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #1B1436 0%, #5C2A5A 45%, #C56A3E 75%, #8B3A1A 100%)',
    }}>
      {/* God rays */}
      <div style={{ position: 'absolute', top: 0, left: '35%', width: 160, height: '80%', background: 'linear-gradient(180deg, rgba(255,180,80,0.18), transparent)', transform: 'rotate(-8deg)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, left: '55%', width: 100, height: '65%', background: 'linear-gradient(180deg, rgba(255,140,60,0.1), transparent)', transform: 'rotate(6deg)', pointerEvents: 'none' }} />

      {/* Stars (fewer, top area) */}
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 1.5, height: 1.5, borderRadius: '50%', background: '#F6F1FF',
          left: `${(i * 137) % 100}%`, top: `${(i * 71) % 35}%`,
          opacity: 0.5,
          animation: `twinkle ${1.5 + (i % 4) * 0.4}s ease-in-out ${(i * 0.3) % 3}s infinite alternate`,
        }} />
      ))}

      {/* Cherry blossom tree left */}
      <svg viewBox="0 0 200 340" style={{ position: 'absolute', left: '2%', bottom: '28%', height: '55%', opacity: 0.85, zIndex: 2 }}>
        <rect x="90" y="100" width="20" height="240" fill="#3A2010" rx="4" />
        <rect x="80" y="160" width="10" height="80" fill="#3A2010" rx="3" transform="rotate(-30 85 200)" />
        <ellipse cx="80" cy="80" rx="70" ry="60" fill="#8B1A4A" opacity="0.7" />
        <ellipse cx="120" cy="60" rx="55" ry="50" fill="#B8244F" opacity="0.6" />
        <ellipse cx="60" cy="50" rx="50" ry="45" fill="#9C1E45" opacity="0.65" />
        <ellipse cx="100" cy="35" rx="45" ry="40" fill="#C42B58" opacity="0.55" />
      </svg>

      {/* Cherry blossom tree right */}
      <svg viewBox="0 0 200 340" style={{ position: 'absolute', right: '3%', bottom: '28%', height: '48%', opacity: 0.75, zIndex: 2, transform: 'scaleX(-1)' }}>
        <rect x="90" y="120" width="18" height="220" fill="#3A2010" rx="4" />
        <ellipse cx="90" cy="95" rx="60" ry="55" fill="#8B1A4A" opacity="0.7" />
        <ellipse cx="120" cy="75" rx="50" ry="45" fill="#B8244F" opacity="0.6" />
      </svg>

      {/* Pagoda silhouettes */}
      <svg viewBox="0 0 1440 400" style={{ position: 'absolute', bottom: '28%', left: 0, width: '100%', opacity: 0.9, zIndex: 3 }} preserveAspectRatio="none">
        <g fill="#221733">
          <rect x="80" y="160" width="120" height="240" />
          <polygon points="40,160 200,160 120,100" />
          <polygon points="60,120 180,120 120,70" />
          <rect x="100" y="130" width="40" height="30" fill="#FFB34744" />
          <rect x="900" y="200" width="180" height="200" />
          <polygon points="860,200 1120,200 990,130" />
          <polygon points="880,155 1100,155 990,100" />
        </g>
        <g fill="#3A2244">
          <rect x="200" y="280" width="60" height="120" />
          <rect x="600" y="260" width="80" height="140" />
          <rect x="1100" y="290" width="50" height="110" />
        </g>
        <rect x="100" y="200" width="30" height="20" fill="#FFB34744" rx="2" />
        <rect x="950" y="230" width="40" height="25" fill="#FFB34733" rx="2" />
      </svg>

      {/* Torii gate */}
      <svg width="140" height="160" viewBox="0 0 140 160" style={{ position: 'absolute', bottom: '28%', left: '42%', zIndex: 4, opacity: 0.7 }}>
        <rect x="12" y="30" width="12" height="130" fill="#2A1010" />
        <rect x="116" y="30" width="12" height="130" fill="#2A1010" />
        <rect x="0" y="28" width="140" height="12" rx="3" fill="#8B2020" />
        <rect x="8" y="46" width="124" height="8" rx="2" fill="#8B2020" opacity="0.7" />
        <rect x="4" y="14" width="132" height="16" rx="4" fill="#C42828" style={{ filter: 'drop-shadow(0 0 6px #FF6A3D)' }} />
      </svg>

      {/* Stone path */}
      <svg viewBox="0 0 1440 80" style={{ position: 'absolute', bottom: '28%', left: 0, width: '100%', zIndex: 4 }} preserveAspectRatio="none">
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} cx={200 + i * 90} cy="50" rx="32" ry="14" fill="#2A1820" stroke="#3A2830" strokeWidth="1" opacity="0.8" />
        ))}
      </svg>

      {/* Koi pond */}
      <div style={{ position: 'absolute', bottom: '29%', right: '18%', width: 100, height: 50, background: 'radial-gradient(ellipse, #0a2a4a88, #051520cc)', borderRadius: '50%', border: '1px solid #1a4a6a44', zIndex: 4, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '20%', width: 20, height: 8, background: '#FF6A3D', borderRadius: '50%', opacity: 0.7, animation: 'koi-swim 4s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '55%', right: '20%', width: 16, height: 6, background: '#ffffff', borderRadius: '50%', opacity: 0.5, animation: 'koi-swim 5s ease-in-out 1s infinite reverse' }} />
      </div>

      {/* Hanging lanterns */}
      <Lanterns />

      {/* Ground */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(180deg, #221733, #0E0A1A)', zIndex: 5 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, #FFB34766, #FF6A3D44, transparent)' }} />
      </div>

      {/* Falling cherry blossoms */}
      {BLOSSOMS.map(b => (
        <div key={b.id} style={{
          position: 'absolute', top: '-20px', left: `${b.x}%`,
          width: b.size, height: b.size,
          background: '#FF6B9D', borderRadius: '50% 0 50% 0', opacity: 0.75,
          animation: `blossom-fall ${b.dur}s linear ${b.delay}s infinite`,
          '--drift': `${b.drift}px`, zIndex: 6,
        } as React.CSSProperties} />
      ))}

      {/* Fireflies */}
      {FIREFLIES.map(f => (
        <div key={f.id} style={{
          position: 'absolute', width: 3, height: 3, borderRadius: '50%',
          background: '#3EE8B5', boxShadow: '0 0 6px #3EE8B5',
          left: `${f.x}%`, bottom: `${f.bottom}%`,
          animation: `firefly-float ${f.dur}s ease-in-out ${f.delay}s infinite`, zIndex: 6,
        }} />
      ))}

      {/* Character — hidden on mobile to avoid overlap */}
      {!isMobile && (
        <div style={{
          position: 'absolute', bottom: '8%', left: '59%', transform: 'translateX(-50%)', zIndex: 8,
          filter: 'drop-shadow(0 0 18px rgba(255,180,80,0.4))',
          opacity: inView ? 1 : 0, transition: 'opacity 0.8s 0.3s',
        }}>
          <Character scale={1.1} />
        </div>
      )}

      {/* Parchment character sheet */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '10%' : '50%',
        left: isMobile ? '50%' : '5%',
        transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
        zIndex: 10,
        opacity: inView ? 1 : 0, transition: 'opacity 0.6s',
        width: isMobile ? 'calc(100vw - 32px)' : undefined,
        maxWidth: isMobile ? 420 : undefined,
      }}>
        <div className="parchment-card" style={{ width: isMobile ? '100%' : 320, padding: '22px 26px' }}>
          {/* Name + emoji */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 52, height: 52, border: '2px solid #8B6B44', flexShrink: 0, background: '#f0e2c0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, borderRadius: 3 }}>🧑‍💻</div>
            <div>
              <div className="font-cinzel" style={{ color: 'var(--ink-text)', fontWeight: 700, fontSize: 15, lineHeight: 1.1 }}>{profile.name}</div>
              <div className="font-grotesk" style={{ color: '#5c3a1e', fontSize: 10, marginTop: 3 }}>{(profile as any).origin}</div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #8B6B4466', marginBottom: 10 }} />

          {/* School */}
          <div style={{ marginBottom: 10 }}>
            <div className="font-mono-code" style={{ color: '#8B6B44', fontSize: 9, letterSpacing: '0.2em', marginBottom: 5 }}>— GUILD —</div>
            <div className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 11, fontWeight: 600 }}>{(profile as any).school}</div>
            <div className="font-grotesk" style={{ color: '#5c3a1e', fontSize: 10 }}>{(profile as any).major}</div>
            <div className="font-grotesk" style={{ color: '#5c3a1e', fontSize: 10 }}>{(profile as any).graduation}</div>
          </div>

          <div style={{ borderTop: '1px solid #8B6B4466', marginBottom: 10 }} />

          {/* Bio */}
          <div style={{ marginBottom: 10 }}>
            <div className="font-mono-code" style={{ color: '#8B6B44', fontSize: 9, letterSpacing: '0.2em', marginBottom: 5 }}>— ABOUT —</div>
            <p className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 11, lineHeight: 1.65 }}>{profile.bio}</p>
            {(profile as any).currently && (
              <p className="font-grotesk" style={{ color: '#5c3a1e', fontSize: 10, marginTop: 6, fontStyle: 'italic' }}>{(profile as any).currently}</p>
            )}
          </div>

          <div style={{ borderTop: '1px solid #8B6B4466', marginBottom: 10 }} />

          {/* Interests */}
          <div>
            <div className="font-mono-code" style={{ color: '#8B6B44', fontSize: 9, letterSpacing: '0.2em', marginBottom: 6 }}>— OUTSIDE THE DUNGEON —</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {((profile as any).interests as string[]).map((t: string) => (
                <span key={t} className="font-grotesk" style={{ background: '#8B6B4418', border: '1px solid #8B6B4466', color: 'var(--ink-text)', fontSize: 10, padding: '3px 8px', borderRadius: 2 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chapter label */}
      <div style={{ position: 'absolute', bottom: '7%', right: '5%', zIndex: 10, textAlign: 'right' }}>
        <div className="font-cinzel" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--paper)', textTransform: 'uppercase' }}>THE VILLAGE</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
          <span className="font-grotesk" style={{ color: '#FFB347', fontSize: 11, letterSpacing: '0.15em' }}>Chapter II</span>
          <div style={{ width: 24, height: 1, background: '#FFB347' }} />
        </div>
      </div>
    </section>
  )
}


function Lanterns() {
  const lanterns = [
    { x: 22, y: 28, string: 40 }, { x: 36, y: 24, string: 36 },
    { x: 48, y: 30, string: 42 }, { x: 63, y: 26, string: 38 },
    { x: 76, y: 22, string: 34 }, { x: 88, y: 28, string: 44 },
  ]
  return (
    <>
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', zIndex: 7, pointerEvents: 'none' }}>
        <path d={`M ${lanterns[0].x}% ${lanterns[0].y}% ${lanterns.map(l => `L ${l.x}% ${l.y}%`).join(' ')}`} stroke="#8B6B44" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
      {lanterns.map((l, i) => (
        <div key={i} style={{ position: 'absolute', left: `${l.x}%`, top: `${l.y}%`, zIndex: 7 }}>
          <div style={{ width: 1, height: l.string, background: '#8B6B44', margin: '0 auto' }} />
          <div style={{
            width: 22, height: 30,
            background: 'radial-gradient(ellipse at 40% 30%, #FFE08A, #FFB347cc, #FF6A3D88)',
            borderRadius: '4px 4px 8px 8px',
            border: '1px solid #FFB34788',
            boxShadow: '0 0 16px 6px #FFB34755, 0 0 4px 1px #FF6A3D44',
            animation: `lantern-sway ${2 + i * 0.4}s ease-in-out infinite alternate`,
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: 4, left: 3, right: 3, height: 2, background: '#FF6A3D55', borderRadius: 1 }} />
          </div>
        </div>
      ))}
    </>
  )
}
