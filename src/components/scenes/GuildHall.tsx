import { useState } from 'react'
import { useScrollReveal, useInView } from '../../lib/useScrollReveal'

export default function GuildHall() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Collaboration', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [raven, setRaven] = useState(false)
  const [sectionRef, inView] = useInView<HTMLElement>(0.2)
  const headingRef = useScrollReveal<HTMLDivElement>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setRaven(true)
    try {
      const res = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, type: form.type, message: form.message }),
      })
      if (res.ok) {
        setSubmitted(true)
      }
    } finally {
      setRaven(false)
    }
  }

  return (
    <section ref={sectionRef} id="scene-guild" style={{
      width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden',
      background: 'linear-gradient(180deg, #0B0A14 0%, #1A1024 60%, #0d0810 100%)',
    }}>
      {/* Wood wall texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, rgba(59,36,24,0.3) 0px, rgba(59,36,24,0.3) 1px, transparent 1px, transparent 40px)', pointerEvents: 'none' }} />

      {/* Fireplace */}
      <div style={{ position: 'absolute', bottom: '28%', left: '8%' }}>
        <svg width="100" height="90" viewBox="0 0 100 90">
          <rect x="10" y="40" width="80" height="50" rx="4" fill="#3B2418" stroke="#5C3A20" strokeWidth="1" />
          <rect x="20" y="50" width="60" height="40" rx="2" fill="#1a0e08" />
          <ellipse cx="50" cy="68" rx="22" ry="10" fill="#FF6A3D44" />
          <rect x="30" y="30" width="40" height="14" rx="2" fill="#5C3A20" />
          <rect x="0" y="88" width="100" height="4" rx="1" fill="#3B2418" />
        </svg>
        <div style={{ position: 'absolute', bottom: 24, left: 26, width: 48, height: 36, background: 'radial-gradient(ellipse at 50% 100%, #FF6A3D, #FF9A4D88, transparent)', filter: 'blur(2px)', animation: 'fire-flicker 0.15s ease-in-out infinite alternate' }} />
        <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, height: 40, background: 'radial-gradient(ellipse, #FF6A3D22, transparent)', filter: 'blur(16px)' }} />
      </div>

      {/* Bar counter */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%', background: '#3B2418' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#5C3A20' }} />
      </div>

      {/* Window */}
      <div style={{ position: 'absolute', top: '15%', right: '8%', width: 120, height: 140, border: '3px solid #5C3A20', background: 'linear-gradient(180deg, #0B0A14, #2A1B4A, #4B1D5C)', borderRadius: 2 }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50% 50%' }} />
        <div style={{ position: 'absolute', bottom: 8, left: 4, right: 4, height: 1, background: 'linear-gradient(90deg, transparent, #FF3EA544, transparent)' }} />
      </div>

      {/* Section heading */}
      <div ref={headingRef} className="reveal reveal--slide-up" style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 5 }}>
        <div className="font-cinzel" style={{ color: 'var(--paper)', fontSize: 'clamp(16px, 2.5vw, 28px)', fontWeight: 700, letterSpacing: '0.2em', textShadow: '0 0 20px var(--amber)' }}>
          GUILD HALL
        </div>
        <div className="font-grotesk" style={{ color: '#FFB34788', fontSize: 10, letterSpacing: '0.2em', marginTop: 3 }}>LEAVE A MESSAGE · DISPATCH A RAVEN</div>
      </div>

      {/* Contact form — parchment */}
      <div style={{
        position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, width: 360,
        opacity: inView ? 1 : 0, transition: 'opacity 0.6s',
      }}>
        <div className="parchment-card" style={{ padding: '20px 24px' }}>
          <div className="font-cinzel" style={{ color: 'var(--ink-text)', fontWeight: 700, fontSize: 14, letterSpacing: '0.15em', textAlign: 'center', marginBottom: 4 }}>
            GUILD HALL — CONTACT
          </div>
          <div className="font-grotesk" style={{ color: '#8B6B44', fontSize: 10, textAlign: 'center', marginBottom: 14 }}>
            Leave a message. A raven will deliver your words.
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🦅</div>
              <div className="font-cinzel" style={{ color: 'var(--jade)', fontSize: 12, letterSpacing: '0.1em' }}>Raven dispatched.</div>
              <div className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 11, marginTop: 4 }}>Expect a reply within 3 sunsets.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FormField label="Traveler's Name" type="text" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Your name..." required />
              <FormField label="Your Contact (email / phone)" type="text" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="email or phone number..." required />
              <div>
                <label className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 11, display: 'block', marginBottom: 4 }}>Quest Type</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['Collaboration', 'Hire', 'Just saying hi', 'Bug report'].map(t => (
                    <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
                      <input type="radio" name="type" value={t} checked={form.type === t} onChange={() => setForm(f => ({ ...f, type: t }))} style={{ accentColor: 'var(--amber)' }} />
                      <span className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 10 }}>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 11, display: 'block', marginBottom: 4 }}>Message</label>
                <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Your message to the guild..." required rows={3}
                  style={{ width: '100%', background: '#8B6B4422', border: '1px solid #8B6B44', borderRadius: 2, padding: '6px 8px', color: 'var(--ink-text)', fontSize: 11, fontFamily: 'Space Grotesk, sans-serif', resize: 'none' }}
                />
              </div>
              <button type="submit" className="font-cinzel" style={{
                background: 'linear-gradient(135deg, #3B2418, #5C3A20)',
                border: '2px solid #8B6B44', color: 'var(--amber)', padding: '10px 0', borderRadius: 3,
                letterSpacing: '0.15em', fontSize: 12, cursor: 'pointer',
                boxShadow: raven ? '0 0 20px var(--amber)' : 'none', transition: 'box-shadow 0.3s',
              }}>
                {raven ? '🦅 RAVEN DISPATCHED...' : '✒ DISPATCH RAVEN'}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Social links — top right, clear of chapter label */}
      <div style={{ position: 'absolute', top: '5%', right: '5%', display: 'flex', gap: 10, zIndex: 10 }}>
        {[
          { label: 'GitHub', href: 'https://github.com/nevkal796' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nevin-kalloor-2b23412a5/' },
        ].map(s => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="font-mono-code" style={{
            color: 'var(--amber)', fontSize: 10, padding: '4px 10px',
            background: '#3B2418', border: '1px solid #8B6B44', borderRadius: 2,
            textDecoration: 'none', letterSpacing: '0.1em',
          }}>
            {s.label}
          </a>
        ))}
      </div>

      {/* Chapter label */}
      <div style={{ position: 'absolute', bottom: '2%', left: '5%', zIndex: 10 }}>
        <div className="font-cinzel" style={{ fontSize: 'clamp(12px, 1.5vw, 18px)', fontWeight: 700, letterSpacing: '0.25em', color: 'var(--paper)', textTransform: 'uppercase' }}>GUILD HALL</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3 }}>
          <div style={{ width: 24, height: 1, background: '#FF6A3D' }} />
          <span className="font-grotesk" style={{ color: '#FF6A3D', fontSize: 11, letterSpacing: '0.15em' }}>Chapter V</span>
        </div>
      </div>
    </section>
  )
}

function FormField({ label, type, value, onChange, placeholder, required }: {
  label: string; type: string; value: string; onChange: (v: string) => void; placeholder: string; required?: boolean
}) {
  return (
    <div>
      <label className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 11, display: 'block', marginBottom: 4 }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} required={required}
        style={{ width: '100%', background: '#8B6B4422', border: 'none', borderBottom: '2px solid #8B6B44', padding: '6px 2px', color: 'var(--ink-text)', fontSize: 12, fontFamily: 'Space Grotesk, sans-serif', outline: 'none' }}
      />
    </div>
  )
}
