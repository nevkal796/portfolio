import { useState, useEffect } from 'react'

const GLOSSARY = [
  { theme: 'Quest Log', plain: 'Projects' },
  { theme: 'Chronicles', plain: 'Experience' },
  { theme: 'Skill Tree', plain: 'Skills' },
  { theme: 'Guild Hall', plain: 'Contact' },
  { theme: 'The Village', plain: 'About Me' },
]

const STORAGE_KEY = 'pd-onboarded'

export default function OnboardingPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      animation: 'fade-in 0.3s ease',
    }} onClick={dismiss}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(11,10,20,0.97)',
          border: '1px solid rgba(92,225,255,0.25)',
          borderRadius: 8,
          padding: '32px 36px',
          maxWidth: 400,
          width: 'calc(100vw - 48px)',
          boxShadow: '0 0 60px rgba(92,225,255,0.1)',
          animation: 'fade-in 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🗺️</div>
          <div className="font-cinzel" style={{ color: 'var(--paper)', fontSize: 15, letterSpacing: '0.2em', fontWeight: 700 }}>
            WELCOME, TRAVELER
          </div>
          <div className="font-grotesk" style={{ color: 'rgba(92,225,255,0.6)', fontSize: 11, marginTop: 4 }}>
            This portfolio is styled as a game world. Here's your map:
          </div>
        </div>

        {/* Glossary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {GLOSSARY.map(({ theme, plain }) => (
            <div key={theme} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="font-cinzel" style={{ color: 'var(--amber)', fontSize: 11, letterSpacing: '0.1em', width: 110, flexShrink: 0 }}>{theme}</span>
              <span style={{ color: 'rgba(92,225,255,0.4)', fontSize: 12 }}>→</span>
              <span className="font-grotesk" style={{ color: 'rgba(243,231,200,0.8)', fontSize: 12 }}>{plain}</span>
            </div>
          ))}
        </div>

        {/* Dismiss */}
        <button
          onClick={dismiss}
          className="font-cinzel"
          style={{
            width: '100%', padding: '10px 0',
            background: 'rgba(92,225,255,0.08)',
            border: '1px solid rgba(92,225,255,0.3)',
            color: 'rgba(92,225,255,0.9)',
            fontSize: 11, letterSpacing: '0.2em',
            cursor: 'pointer', borderRadius: 4,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(92,225,255,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(92,225,255,0.08)')}
        >
          ✓ GOT IT — BEGIN ADVENTURE
        </button>
        <div className="font-grotesk" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 10, marginTop: 10 }}>
          Hover themed titles anytime to see plain labels
        </div>
      </div>
    </div>
  )
}
