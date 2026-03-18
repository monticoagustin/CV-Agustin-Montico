import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0) // 0: in, 1: ring, 2: out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700)
    const t2 = setTimeout(() => setPhase(2), 1300)
    const t3 = setTimeout(() => onComplete(), 1900)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: [0.77, 0, 0.18, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#030309',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {/* Ring burst */}
          <motion.div
            style={{
              position: 'absolute',
              width: 140,
              height: 140,
              borderRadius: '50%',
              border: '1px solid rgba(0,120,212,0.6)',
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              phase >= 1
                ? { scale: 10, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Second ring, delayed */}
          <motion.div
            style={{
              position: 'absolute',
              width: 140,
              height: 140,
              borderRadius: '50%',
              border: '1px solid rgba(0,188,242,0.3)',
            }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={
              phase >= 1
                ? { scale: 14, opacity: 0 }
                : { scale: 1, opacity: 0.6 }
            }
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          />

          {/* AM Initials */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '3.5rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 0%, #4da6ff 55%, #00bcf2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              position: 'relative',
              zIndex: 1,
            }}
          >
            AM
          </motion.div>

          {/* Progress bar */}
          <motion.div
            style={{
              width: 80,
              height: 1,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #0078d4, #00bcf2)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Agustin Montico
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
