import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminAuth, adminLogout } from '../../lib/useAdminAuth'
import { saveOverride, clearOverride } from '../../lib/useLiveData'
import baseProfile from '../../data/profile.json'
import baseProjects from '../../data/projects.json'
import baseSkills from '../../data/skills.json'
import type { Profile, Project, SkillNode } from '../../data/types'

type Tab = 'profile' | 'projects' | 'skills'

export default function AdminDashboard() {
  useAdminAuth(true)
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>('profile')
  const [profile, setProfile] = useState<Profile>(baseProfile as Profile)
  const [projects, setProjects] = useState<Project[]>(baseProjects as Project[])
  const [skills, setSkills] = useState<SkillNode[]>(baseSkills as SkillNode[])
  const [saved, setSaved] = useState(false)
  const dragIndex = useRef<number | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem('pixel-drifter-overrides')
    if (!raw) return
    const o = JSON.parse(raw)
    if (o.profile) setProfile(o.profile)
    if (o.projects) setProjects(o.projects)
    if (o.skills) setSkills(o.skills)
  }, [])

  const save = (key: 'profile' | 'projects' | 'skills', value: unknown) => {
    saveOverride(key, value)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const exportJson = (key: Tab) => {
    const data = key === 'profile' ? profile : key === 'projects' ? projects : skills
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `${key}.json`; a.click()
    URL.revokeObjectURL(url)
  }

  const reset = (key: Tab) => {
    clearOverride(key)
    if (key === 'profile') setProfile(baseProfile as Profile)
    if (key === 'projects') setProjects(baseProjects as Project[])
    if (key === 'skills') setSkills(baseSkills as SkillNode[])
  }

  const logout = () => { adminLogout(); navigate('/') }

  const panelStyle: React.CSSProperties = { minHeight: '100vh', background: 'var(--night)', padding: '24px', fontFamily: 'Space Grotesk, sans-serif' }
  const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 20px', cursor: 'pointer', border: 'none',
    background: active ? 'var(--violet)' : 'var(--haze)',
    color: 'var(--paper)', fontFamily: 'Cinzel, serif', fontSize: 12, letterSpacing: '0.1em',
    borderRadius: 3, transition: 'background 0.2s',
  })
  const inputStyle: React.CSSProperties = { width: '100%', background: 'var(--haze)', border: '1px solid #3a3a6a', borderRadius: 3, padding: '6px 10px', color: 'var(--paper)', fontSize: 12, fontFamily: 'Space Grotesk, sans-serif', outline: 'none' }
  const labelStyle: React.CSSProperties = { color: 'var(--electric)', fontSize: 11, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }
  const btnStyle: React.CSSProperties = { padding: '8px 16px', cursor: 'pointer', border: '1px solid var(--violet)', background: 'transparent', color: 'var(--violet)', borderRadius: 3, fontSize: 12, fontFamily: 'Space Grotesk, sans-serif' }

  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <div className="font-cinzel" style={{ color: 'var(--paper)', fontSize: 18, letterSpacing: '0.15em' }}>ADMIN PANEL</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {saved && <span style={{ color: 'var(--jade)', fontSize: 12 }}>✓ Saved to preview</span>}
          <button onClick={() => navigate('/')} style={btnStyle}>View Site</button>
          <button onClick={logout} style={{ ...btnStyle, borderColor: 'var(--danger)', color: 'var(--danger)' }}>Log Out</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {(['profile', 'projects', 'skills'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)} style={tabStyle(tab === t)}>{t.toUpperCase()}</button>
        ))}
      </div>

      {/* Tab actions */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button onClick={() => save(tab, tab === 'profile' ? profile : tab === 'projects' ? projects : skills)} style={{ ...btnStyle, borderColor: 'var(--jade)', color: 'var(--jade)' }}>
          Save Preview
        </button>
        <button onClick={() => exportJson(tab)} style={btnStyle}>Export JSON</button>
        <button onClick={() => reset(tab)} style={{ ...btnStyle, borderColor: 'var(--danger)', color: 'var(--danger)' }}>Reset to File</button>
      </div>

      <div style={{ maxWidth: 700 }}>
        {tab === 'profile' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {([
              ['name', 'Name'], ['classTitle', 'Class Title'], ['origin', 'Origin'],
              ['age', 'Age'], ['bio', 'Bio'], ['traits', 'Traits (comma-separated)'],
              ['hp', 'HP (0–100)'], ['mp', 'MP (0–100)'], ['expCurrent', 'EXP Current'], ['expTotal', 'EXP Total'],
            ] as [keyof Profile, string][]).map(([key, label]) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                {key === 'bio' ? (
                  <textarea value={String(profile[key] ?? '')} rows={3} onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))} style={{ ...inputStyle, resize: 'vertical' }} />
                ) : key === 'traits' ? (
                  <input value={(profile[key] as string[]).join(', ')} onChange={e => setProfile(p => ({ ...p, traits: e.target.value.split(',').map(t => t.trim()) }))} style={inputStyle} />
                ) : (
                  <input value={String(profile[key] ?? '')} type={typeof profile[key] === 'number' ? 'number' : 'text'} onChange={e => setProfile(p => ({ ...p, [key]: typeof profile[key] === 'number' ? Number(e.target.value) : e.target.value }))} style={inputStyle} />
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <button onClick={() => setProjects(ps => [...ps, { id: `proj-${Date.now()}`, questNumber: ps.length + 1, title: 'New Quest', difficulty: 1, status: 'IN_PROGRESS', description: '', techTags: [], featured: false, sortOrder: ps.length + 1 }])} style={{ ...btnStyle, alignSelf: 'flex-start' }}>
              + Add Project
            </button>
            {projects.map((p, i) => (
              <div key={p.id} draggable
                onDragStart={() => { dragIndex.current = i }}
                onDragOver={e => e.preventDefault()}
                onDrop={() => {
                  const from = dragIndex.current
                  if (from === null || from === i) return
                  setProjects(ps => {
                    const next = [...ps]
                    const [moved] = next.splice(from, 1)
                    next.splice(i, 0, moved)
                    return next.map((proj, idx) => ({ ...proj, questNumber: idx + 1, sortOrder: idx + 1 }))
                  })
                  dragIndex.current = null
                }}
                style={{ border: '1px solid var(--haze)', borderRadius: 6, padding: 16, display: 'flex', flexDirection: 'column', gap: 10, cursor: 'grab' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--electric)', fontSize: 12 }}>⠿ #{String(p.questNumber).padStart(3, '0')} {p.title}</span>
                  <button onClick={() => setProjects(ps => ps.filter((_, j) => j !== i))} style={{ ...btnStyle, borderColor: 'var(--danger)', color: 'var(--danger)', padding: '4px 10px', fontSize: 11 }}>Remove</button>
                </div>
                {([['title', 'Title'], ['description', 'Description'], ['techTags', 'Tech Tags (comma-separated)'], ['githubUrl', 'GitHub URL'], ['demoUrl', 'Demo URL (optional)']] as [keyof Project, string][]).map(([key, label]) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input value={Array.isArray(p[key]) ? (p[key] as string[]).join(', ') : String(p[key] ?? '')}
                      onChange={e => setProjects(ps => ps.map((proj, j) => j !== i ? proj : { ...proj, [key]: key === 'techTags' ? e.target.value.split(',').map(t => t.trim()) : e.target.value }))}
                      style={inputStyle} />
                  </div>
                ))}

                {/* Image upload */}
                <div>
                  <label style={labelStyle}>Project Image</label>
                  {p.imageUrl && (
                    <div style={{ marginBottom: 8, position: 'relative', display: 'inline-block' }}>
                      <img src={p.imageUrl} alt="preview" style={{ width: 200, height: 112, objectFit: 'cover', borderRadius: 3, border: '1px solid var(--haze)', display: 'block' }} />
                      <button
                        onClick={() => setProjects(ps => ps.map((proj, j) => j !== i ? proj : { ...proj, imageUrl: undefined }))}
                        style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.7)', border: 'none', color: 'var(--danger)', cursor: 'pointer', borderRadius: 2, padding: '2px 6px', fontSize: 11 }}>
                        ✕
                      </button>
                    </div>
                  )}
                  <input type="file" accept="image/*"
                    style={{ color: 'var(--paper)', fontSize: 12, cursor: 'pointer' }}
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (!file) return
                      const reader = new FileReader()
                      reader.onload = ev => {
                        const img = new Image()
                        img.onload = () => {
                          const MAX = 900
                          const scale = Math.min(1, MAX / Math.max(img.width, img.height))
                          const canvas = document.createElement('canvas')
                          canvas.width = Math.round(img.width * scale)
                          canvas.height = Math.round(img.height * scale)
                          canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
                          const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
                          setProjects(ps => ps.map((proj, j) => j !== i ? proj : { ...proj, imageUrl: dataUrl }))
                        }
                        img.src = ev.target!.result as string
                      }
                      reader.readAsDataURL(file)
                      e.target.value = ''
                    }}
                  />
                  <div style={{ color: '#8888aa', fontSize: 10, marginTop: 4 }}>Resized to max 900px · stored in browser preview (export JSON to persist)</div>
                </div>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--paper)', fontSize: 12 }}>
                    <input type="checkbox" checked={p.featured} onChange={e => setProjects(ps => ps.map((proj, j) => j !== i ? proj : { ...proj, featured: e.target.checked }))} />
                    Featured
                  </label>
                  <label style={{ color: 'var(--paper)', fontSize: 12 }}>
                    Status:
                    <select value={p.status} onChange={e => setProjects(ps => ps.map((proj, j) => j !== i ? proj : { ...proj, status: e.target.value as Project['status'] }))} style={{ ...inputStyle, width: 'auto', marginLeft: 8 }}>
                      <option>COMPLETED</option><option>IN_PROGRESS</option><option>ARCHIVED</option>
                    </select>
                  </label>
                  <label style={{ color: 'var(--paper)', fontSize: 12 }}>
                    Difficulty:
                    <input type="number" min={1} max={5} value={p.difficulty} onChange={e => setProjects(ps => ps.map((proj, j) => j !== i ? proj : { ...proj, difficulty: Number(e.target.value) as Project['difficulty'] }))} style={{ ...inputStyle, width: 60, marginLeft: 8 }} />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => setSkills(ss => [...ss, { id: `skill-${Date.now()}`, name: 'New Skill', category: 'Tools/Other', proficiency: 1, unlocked: true }])} style={{ ...btnStyle, alignSelf: 'flex-start' }}>
              + Add Skill
            </button>
            {skills.map((s, i) => (
              <div key={s.id} style={{ border: '1px solid var(--haze)', borderRadius: 6, padding: 12, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <input value={s.name} onChange={e => setSkills(ss => ss.map((sk, j) => j !== i ? sk : { ...sk, name: e.target.value }))} style={{ ...inputStyle, width: 140 }} />
                <select value={s.category} onChange={e => setSkills(ss => ss.map((sk, j) => j !== i ? sk : { ...sk, category: e.target.value as SkillNode['category'] }))} style={{ ...inputStyle, width: 160 }}>
                  {['Languages','Frontend','Backend/DB','Systems/ML','Tools/Other'].map(c => <option key={c}>{c}</option>)}
                </select>
                <label style={{ color: 'var(--paper)', fontSize: 12 }}>Lvl <input type="number" min={1} max={5} value={s.proficiency} onChange={e => setSkills(ss => ss.map((sk, j) => j !== i ? sk : { ...sk, proficiency: Number(e.target.value) as SkillNode['proficiency'] }))} style={{ ...inputStyle, width: 50 }} /></label>
                <label style={{ display: 'flex', gap: 6, alignItems: 'center', color: 'var(--paper)', fontSize: 12 }}>
                  <input type="checkbox" checked={s.unlocked} onChange={e => setSkills(ss => ss.map((sk, j) => j !== i ? sk : { ...sk, unlocked: e.target.checked }))} /> Unlocked
                </label>
                <button onClick={() => setSkills(ss => ss.filter((_, j) => j !== i))} style={{ ...btnStyle, borderColor: 'var(--danger)', color: 'var(--danger)', padding: '4px 10px', fontSize: 11 }}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
