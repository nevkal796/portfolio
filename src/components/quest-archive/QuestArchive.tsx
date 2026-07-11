import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../lib/useLiveData'
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

const STATUS_STYLE: Record<Project['status'], { color: string; bg: string }> = {
  COMPLETED: { color: '#3EE8B5', bg: '#3EE8B511' },
  IN_PROGRESS: { color: '#FFB347', bg: '#FFB34711' },
  ARCHIVED: { color: '#8888aa', bg: '#8888aa11' },
}

const STARS = (n: number) => '★'.repeat(n) + '☆'.repeat(5 - n)

export default function QuestArchive() {
  const navigate = useNavigate()
  const projects = useProjects().sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #141024 0%, #2E1E4A 100%)', padding: '80px 24px 60px' }}>

      {/* Back button */}
      <button
        onClick={() => navigate('/?scene=quests')}
        style={{
          position: 'fixed', top: 16, left: 16, zIndex: 50,
          background: '#2A1810', border: '2px solid #8B6B44', color: 'var(--amber)',
          padding: '8px 16px', cursor: 'pointer', borderRadius: 3,
        }}
        className="font-cinzel"
        title="Back to the world"
      >
        ← Back to the World
      </button>

      {/* HUD minimap placeholder */}
      <div className="hud-panel" style={{ position: 'fixed', bottom: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}>
        <span className="font-cinzel" style={{ color: 'var(--electric)', fontSize: 10, letterSpacing: '0.2em' }}>QUEST ARCHIVE</span>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 className="font-cinzel" style={{ color: 'var(--paper)', fontSize: 'clamp(20px, 4vw, 36px)', fontWeight: 700, letterSpacing: '0.15em', textShadow: '0 0 20px var(--amber)' }}>
            QUEST ARCHIVE
          </h1>
          <p className="font-grotesk" style={{ color: 'var(--bone)', fontSize: 12, marginTop: 8, opacity: 0.6, letterSpacing: '0.2em' }}>
            ALL RECORDED QUESTS · {projects.length} ENTRIES
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="quest-card" style={{ maxWidth: 300, margin: '0 auto', padding: '24px', textAlign: 'center' }}>
            <div className="font-cinzel" style={{ color: 'var(--ink-text)', fontSize: 13 }}>No further quests recorded yet.</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24, justifyContent: 'center' }}>
            {projects.map(p => <ArchiveCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function ArchiveCard({ project: p }: { project: Project }) {
  const navigate = useNavigate()
  const status = STATUS_STYLE[p.status]
  return (
    <div className="quest-card" style={{ position: 'relative', cursor: 'pointer' }}
      onClick={() => navigate(`/quests/${p.id}`, { state: { from: '/quests' } })}
    >
      <div style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', width: 22, height: 22, borderRadius: '50%', background: '#B8324B', border: '2px solid #8a1f33', boxShadow: '0 0 8px #B8324B88', zIndex: 2 }} />
      <div style={{ padding: '20px 14px 14px' }}>
        <div className="font-mono-code" style={{ color: '#8B6B44', fontSize: 9, letterSpacing: '0.15em' }}>QUEST · #{String(p.questNumber).padStart(3, '0')}</div>
        <div style={{ borderBottom: '1px solid #8B6B4466', margin: '4px 0 8px' }} />
        <div className="font-cinzel" style={{ color: 'var(--ink-text)', fontSize: 13, fontWeight: 700, lineHeight: 1.3, marginBottom: 6 }}>{p.title}</div>
        <div className="font-vt323" style={{ color: '#8B6B44', fontSize: 14 }}>{STARS(p.difficulty)}</div>
        <div style={{ marginBottom: 8 }}>
          <span className="font-mono-code" style={{ fontSize: 9, padding: '2px 6px', background: status.bg, color: status.color, border: `1px solid ${status.color}44`, borderRadius: 2 }}>
            {p.status.replace('_', ' ')}
          </span>
        </div>
        <p className="font-grotesk" style={{ color: 'var(--ink-text)', fontSize: 11, lineHeight: 1.5, marginBottom: 8 }}>"{p.description}"</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, marginBottom: 8 }}>
          {p.techTags.map(t => (
            <span key={t} style={{ fontSize: 9, padding: '1px 5px', background: `${CATEGORY_COLORS[t] ?? '#8888aa'}22`, color: CATEGORY_COLORS[t] ?? '#8888aa', border: `1px solid ${CATEGORY_COLORS[t] ?? '#8888aa'}44`, borderRadius: 2 }} className="font-mono-code">
              ⚔ {t}
            </span>
          ))}
        </div>
        <div className="font-cinzel" style={{ color: 'var(--amber)', fontSize: 9, letterSpacing: '0.1em', marginTop: 4 }}>Read quest log →</div>
      </div>
    </div>
  )
}
