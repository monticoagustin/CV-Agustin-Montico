import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const cursorX = useMotionValue(-300)
  const cursorY = useMotionValue(-300)
  const [hovered, setHovered] = useState(false)

  // Slow spring for ambient glow
  const glowX = useSpring(cursorX, { stiffness: 80, damping: 22 })
  const glowY = useSpring(cursorY, { stiffness: 80, damping: 22 })

  // Fast spring for precise dot
  const dotX = useSpring(cursorX, { stiffness: 700, damping: 32 })
  const dotY = useSpring(cursorY, { stiffness: 700, damping: 32 })

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .pill, .card')) {
        setHovered(true)
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], .pill, .card')) {
        setHovered(false)
      }
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Large ambient glow */}
      <motion.div
        style={{
          position: 'fixed',
          left: glowX,
          top: glowY,
          x: '-50%',
          y: '-50%',
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,120,212,0.066) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Precise dot — morphs into ring on hover */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          x: '-50%',
          y: '-50%',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9996,
        }}
        animate={
          hovered
            ? {
                width: 36,
                height: 36,
                background: 'transparent',
                border: '1.5px solid rgba(0,188,242,0.85)',
                boxShadow: '0 0 12px rgba(0,188,242,0.4), inset 0 0 8px rgba(0,188,242,0.1)',
              }
            : {
                width: 7,
                height: 7,
                background: 'rgba(0,140,220,0.85)',
                border: '1px solid rgba(0,188,242,0.5)',
                boxShadow: '0 0 8px rgba(0,120,212,0.6)',
              }
        }
        transition={{ duration: 0.18, ease: 'easeOut' }}
      />
    </>
  )
}
