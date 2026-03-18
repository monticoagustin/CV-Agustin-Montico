import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({ children, className, style, onClick, intensity = 8 }) {
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const x = useSpring(rawX, { stiffness: 200, damping: 25 })
  const y = useSpring(rawY, { stiffness: 200, damping: 25 })

  const rotateX = useTransform(y, [-0.5, 0.5], [intensity, -intensity])
  const rotateY = useTransform(x, [-0.5, 0.5], [-intensity, intensity])
  const glowX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glowY = useTransform(y, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
        ...style,
      }}
      className={className}
    >
      {/* Inner glow that follows cursor within card */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0,120,212,0.08) 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, display: 'inherit', flexDirection: 'inherit', gap: 'inherit', alignItems: 'inherit', width: '100%' }}>{children}</div>
    </motion.div>
  )
}
