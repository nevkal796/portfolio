import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])
  const trailCount = 8

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.05 })
      trailsRef.current.forEach((t, i) => {
        gsap.to(t, { x: e.clientX, y: e.clientY, duration: 0.12 + i * 0.04, delay: i * 0.02 })
      })
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  return (
    <>
      {/* Trail particles */}
      {Array.from({ length: trailCount }, (_, i) => (
        <div
          key={i}
          ref={el => { if (el) trailsRef.current[i] = el }}
          style={{
            position: 'fixed', pointerEvents: 'none', zIndex: 9998,
            width: 4 - i * 0.3, height: 4 - i * 0.3,
            borderRadius: 1,
            background: i % 2 === 0 ? 'var(--neon-pink)' : 'var(--electric)',
            opacity: 1 - i * 0.1,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      {/* Main cursor */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed', pointerEvents: 'none', zIndex: 9999,
          width: 12, height: 12, borderRadius: 1,
          border: '2px solid var(--neon-pink)',
          boxShadow: '0 0 8px var(--neon-pink)',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}
