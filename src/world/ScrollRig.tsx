import { useEffect, useCallback } from 'react'

interface Props {
  onProgress: (p: number) => void
  children: React.ReactNode
}

export default function ScrollRig({ onProgress, children }: Props) {
  const handleScroll = useCallback(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight
    onProgress(total > 0 ? window.scrollY / total : 0)
  }, [onProgress])

  useEffect(() => {
    let rafId = 0
    const throttled = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(handleScroll)
    }
    window.addEventListener('scroll', throttled, { passive: true })
    handleScroll()
    return () => { window.removeEventListener('scroll', throttled); cancelAnimationFrame(rafId) }
  }, [handleScroll])

  return <div>{children}</div>
}
