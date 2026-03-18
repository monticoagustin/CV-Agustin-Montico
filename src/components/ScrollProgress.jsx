import { useScroll, useSpring, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #0078d4, #00bcf2, #4da6ff)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 999,
        boxShadow: '0 0 10px rgba(0,188,242,0.6), 0 0 20px rgba(0,120,212,0.3)',
      }}
    />
  )
}
