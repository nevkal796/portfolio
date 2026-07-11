import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../lib/useAdminAuth'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminLogin(password)) {
      navigate('/admin')
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="parchment-card" style={{ width: 300, padding: '28px 32px', textAlign: 'center' }}>
        <div className="font-cinzel" style={{ color: 'var(--ink-text)', fontWeight: 700, fontSize: 16, letterSpacing: '0.15em', marginBottom: 6 }}>
          GUILD MASTER ACCESS
        </div>
        <div className="font-grotesk" style={{ color: '#8B6B44', fontSize: 11, marginBottom: 20 }}>
          Enter your secret word to access the admin panel.
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false) }}
            placeholder="Secret word..."
            autoFocus
            style={{ width: '100%', background: '#8B6B4422', border: '1px solid #8B6B44', borderRadius: 3, padding: '8px 10px', color: 'var(--ink-text)', fontSize: 13, fontFamily: 'JetBrains Mono, monospace', outline: 'none', textAlign: 'center' }}
          />
          {error && <div className="font-grotesk" style={{ color: 'var(--danger)', fontSize: 11 }}>Incorrect password.</div>}
          <button type="submit" className="font-cinzel" style={{ background: '#2A1810', border: '2px solid #8B6B44', color: 'var(--amber)', padding: '10px 0', borderRadius: 3, cursor: 'pointer', letterSpacing: '0.15em', fontSize: 12 }}>
            ENTER
          </button>
        </form>
        <button onClick={() => navigate('/')} className="font-grotesk" style={{ marginTop: 12, background: 'none', border: 'none', color: '#8B6B44', fontSize: 11, cursor: 'pointer' }}>
          ← Back to world
        </button>
      </div>
    </div>
  )
}
