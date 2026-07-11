import { useMemo } from 'react'
import baseProfile from '../data/profile.json'
import baseProjects from '../data/projects.json'
import baseSkills from '../data/skills.json'
import type { Profile, Project, SkillNode } from '../data/types'

const LS_KEY = 'pixel-drifter-overrides'

function getOverrides(): Record<string, unknown> {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useProfile(): Profile {
  return useMemo(() => {
    const overrides = getOverrides()
    return overrides.profile
      ? (overrides.profile as Profile)
      : (baseProfile as Profile)
  }, [])
}

export function useProjects(): Project[] {
  return useMemo(() => {
    const overrides = getOverrides()
    return overrides.projects
      ? (overrides.projects as Project[])
      : (baseProjects as Project[])
  }, [])
}

export function useSkills(): SkillNode[] {
  return useMemo(() => {
    const overrides = getOverrides()
    return overrides.skills
      ? (overrides.skills as SkillNode[])
      : (baseSkills as SkillNode[])
  }, [])
}

export function saveOverride(key: 'profile' | 'projects' | 'skills', value: unknown) {
  const overrides = getOverrides()
  overrides[key] = value
  localStorage.setItem(LS_KEY, JSON.stringify(overrides))
}

export function clearOverride(key: 'profile' | 'projects' | 'skills') {
  const overrides = getOverrides()
  delete overrides[key]
  localStorage.setItem(LS_KEY, JSON.stringify(overrides))
}
