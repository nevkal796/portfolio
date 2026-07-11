import { useEffect, useState } from 'react'

interface Props {
  onDone: () => void
}

export default function LoadingScreen({ onDone }: Props) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(0)

  const phases = [
    'INITIALIZING WORLD_',
    'LOADING ASSETS · SCENE 1/5',
    'SPAWNING ENTITIES_',
    'PRESS ANY KEY TO SPAWN',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 1.4
      })
    }, 20)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress > 25) setPhase(1)
    if (progress > 60) setPhase(2)
    if (progress >= 100) setPhase(3)
  }, [progress])

  useEffect(() => {
    if (phase < 3) return
    const keyHandler = () => onDone()
    window.addEventListener('keydown', keyHandler)
    window.addEventListener('click', keyHandler)
    const auto = setTimeout(onDone, 2000)
    return () => { window.removeEventListener('keydown', keyHandler); window.removeEventListener('click', keyHandler); clearTimeout(auto) }
  }, [phase, onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'var(--ink)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20,
    }}>
      {/* Pixel logo / character silhouette */}
      <div style={{ fontSize: 48, marginBottom: 8 }}>🌏</div>

      <div className="font-cinzel" style={{ color: 'var(--electric)', fontSize: 18, letterSpacing: '0.25em', textShadow: '0 0 20px var(--electric)' }}>
        PIXEL DRIFTER
      </div>

      <div className="font-mono-code" style={{ color: 'var(--bone)', fontSize: 12, letterSpacing: '0.2em', height: 18 }}>
        {phases[phase]}
        {phase < 3 && <span style={{ animation: 'blink-cursor 0.7s steps(1) infinite' }}>█</span>}
      </div>

      <div style={{ width: 260, height: 4, background: '#ffffff11', borderRadius: 2 }}>
        <div style={{
          width: `${Math.min(progress, 100)}%`, height: '100%',
          background: 'var(--electric)', borderRadius: 2,
          boxShadow: '0 0 8px var(--electric)',
          transition: 'width 0.05s linear',
        }} />
      </div>

      <div className="font-vt323" style={{ color: 'var(--haze)', fontSize: 16 }}>
        {Math.round(Math.min(progress, 100))}%
      </div>

      {phase === 3 && (
        <div className="font-mono-code" style={{ color: 'var(--neon-pink)', fontSize: 11, letterSpacing: '0.2em', animation: 'pulse 1s ease-in-out infinite', marginTop: 8 }}>
          [ PRESS ANY KEY TO SPAWN ]
        </div>
      )}
    </div>
  )
}
