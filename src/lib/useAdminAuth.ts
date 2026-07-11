import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SESSION_KEY = 'pixel-drifter-admin-unlocked'

export function useAdminAuth(redirectIfLocked = true) {
  const navigate = useNavigate()
  const isUnlocked = sessionStorage.getItem(SESSION_KEY) === 'true'

  useEffect(() => {
    if (redirectIfLocked && !isUnlocked) {
      navigate('/admin/login', { replace: true })
    }
  }, [isUnlocked, redirectIfLocked, navigate])

  return { isUnlocked }
}

export function adminLogin(password: string): boolean {
  const correct = import.meta.env.VITE_ADMIN_PASSWORD
  if (password === correct) {
    sessionStorage.setItem(SESSION_KEY, 'true')
    return true
  }
  return false
}

export function adminLogout() {
  sessionStorage.removeItem(SESSION_KEY)
}
