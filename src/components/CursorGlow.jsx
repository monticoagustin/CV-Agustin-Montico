import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const cursorX = useMotionValue(-300)
  const cursorY = useMotionValue(-300)

  const glowX = useSpring(cursorX, { stiffness: 80, damping: 22 })
  const glowY = useSpring(cursorY, { stiffness: 80, damping: 22 })

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
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

    </>
  )
}
