import { useState, useCallback, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import HUD from './components/hud/HUD'
import CustomCursor from './components/CustomCursor'
import ScrollRig from './world/ScrollRig'
import SpawnPoint from './components/scenes/SpawnPoint'
import Village from './components/scenes/Village'
import QuestLog from './components/scenes/QuestLog'
import SkillTree from './components/scenes/SkillTree'
import GuildHall from './components/scenes/GuildHall'
import QuestArchive from './components/quest-archive/QuestArchive'
import QuestDetail from './components/scenes/QuestDetail'
import AdminLogin from './components/admin/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'

const SCENE_IDS = ['scene-spawn', 'scene-village', 'scene-quests', 'scene-skills', 'scene-guild']

function WorldView() {
  const [progress, setProgress] = useState(0)
  const [muted, setMuted] = useState(() => localStorage.getItem('pd-muted') === 'true')
  // Only show loading screen on first visit this session
  const [loaded, setLoaded] = useState(() => sessionStorage.getItem('pd-spawned') === '1')
  const [searchParams] = useSearchParams()
  const scrolledToScene = useRef(false)

  const handleProgress = useCallback((p: number) => setProgress(p), [])

  const toggleMute = () => {
    setMuted(m => {
      localStorage.setItem('pd-muted', String(!m))
      return !m
    })
  }

  // Jump to scene requested via ?scene= param (e.g. coming back from /quests)
  useEffect(() => {
    if (!loaded || scrolledToScene.current) return
    const scene = searchParams.get('scene')
    if (!scene) return
    const idx = ['spawn','village','quests','skills','guild'].indexOf(scene)
    if (idx < 0) return
    scrolledToScene.current = true
    setTimeout(() => {
      document.getElementById(SCENE_IDS[idx])?.scrollIntoView({ behavior: 'instant' })
    }, 100)
  }, [loaded, searchParams])

  // Konami code
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
    let idx = 0
    const handler = (e: KeyboardEvent) => {
      if (e.key === seq[idx]) {
        idx++
        if (idx === seq.length) {
          document.body.style.filter = 'hue-rotate(120deg)'
          setTimeout(() => { document.body.style.filter = '' }, 3000)
          idx = 0
        }
      } else {
        idx = 0
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!loaded) return <LoadingScreen onDone={() => { sessionStorage.setItem('pd-spawned', '1'); setLoaded(true) }} />

  return (
    <div>
      <HUD progress={progress} muted={muted} onToggleMute={toggleMute} showScrollHint sceneIds={SCENE_IDS} />
      <ScrollRig onProgress={handleProgress}>
        <SpawnPoint />
        <Village />
        <QuestLog />
        <SkillTree />
        <GuildHall />
      </ScrollRig>
    </div>
  )
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  return (
    <BrowserRouter basename="/portfolio">
      {!reducedMotion && <CustomCursor />}
      <Routes>
        <Route path="/" element={<WorldView />} />
        <Route path="/quests" element={<QuestArchive />} />
        <Route path="/quests/:id" element={<QuestDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
