import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProfile } from '../../lib/useLiveData'
import { useIsMobile } from '../../lib/useIsMobile'

const SCENES = ['SPAWN', 'VILLAGE', 'CHRONICLES', 'QUESTS', 'SKILLS', 'GUILD']

interface Props {
  progress: number
  muted: boolean
  onToggleMute: () => void
  showScrollHint: boolean
  sceneIds: string[]
}

export default function HUD({ progress, muted, onToggleMute, showScrollHint, sceneIds }: Props) {
  const profile = useProfile()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const activeScene = Math.min(Math.floor(progress * 6), 5)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    if (progress > 0.01) setHasScrolled(true)
  }, [progress])

  const jumpToScene = (index: number) => {
    document.getElementById(sceneIds[index])?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Top-left player card */}
      <div className="hud-panel" style={{ position: 'fixed', top: 14, left: 14, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className="portrait-frame">
            <div className="portrait-blink" />
          </div>
          {!isMobile && (
            <div>
              <div className="font-cinzel" style={{ color: 'var(--paper)', fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {profile.name}
              </div>
              <div className="font-vt323" style={{ color: 'var(--violet)', fontSize: 16, lineHeight: 1 }}>
                LVL 3 · {profile.classTitle}
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                <MiniBar value={profile.hp} max={100} color="var(--jade)" label="HP" />
                <MiniBar value={profile.mp} max={100} color="var(--violet)" label="MP" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top-right controls */}
      <div className="hud-panel" style={{ position: 'fixed', top: 14, right: 14, zIndex: 50, display: 'flex', gap: 10 }}>
        <button onClick={onToggleMute} className="hud-btn" title={muted ? 'Unmute' : 'Mute'}>
          {muted ? '🔇' : '🔊'}
        </button>
        <button onClick={() => navigate('/admin/login')} className="hud-btn" title="Admin">
          ⚙
        </button>
      </div>

      {/* Bottom center minimap */}
      <div className="hud-panel" style={{ position: 'fixed', bottom: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div className="font-cinzel" style={{ color: 'var(--electric)', fontSize: 9, letterSpacing: '0.2em' }}>
          {SCENES[activeScene]}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {SCENES.map((name, i) => (
            <button
              key={name}
              onClick={() => jumpToScene(i)}
              title={name}
              style={{
                width: i === activeScene ? 10 : 8,
                height: i === activeScene ? 10 : 8,
                borderRadius: '50%',
                border: `1px solid ${i === activeScene ? 'var(--neon-pink)' : 'var(--electric)'}`,
                background: i === activeScene ? 'var(--neon-pink)' : 'transparent',
                boxShadow: i === activeScene ? '0 0 8px var(--neon-pink)' : 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
        <div style={{ width: 120, height: 2, background: 'var(--haze)', borderRadius: 1 }}>
          <div style={{ width: `${progress * 100}%`, height: '100%', background: 'var(--electric)', borderRadius: 1, transition: 'width 0.1s' }} />
        </div>
      </div>

      {/* Scroll hint */}
      {showScrollHint && !hasScrolled && (
        <div style={{ position: 'fixed', bottom: 70, left: '50%', transform: 'translateX(-50%)', zIndex: 50, textAlign: 'center', animation: 'pulse 2s ease-in-out infinite' }}>
          <div className="font-mono-code" style={{ color: 'var(--bone)', fontSize: 10, letterSpacing: '0.2em', opacity: 0.6 }}>
            ↓ SCROLL TO EXPLORE
          </div>
        </div>
      )}
    </>
  )
}

function MiniBar({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <span className="font-vt323" style={{ color, fontSize: 12, width: 16 }}>{label}</span>
      <div style={{ width: 50, height: 4, background: 'var(--haze)', borderRadius: 2 }}>
        <div style={{ width: `${(value / max) * 100}%`, height: '100%', background: color, borderRadius: 2 }} />
      </div>
    </div>
  )
}
