import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

export function useCounter(end, duration = 1800) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false, margin: '-40px' })
  const [count, setCount] = useState(0)
  const animRef = useRef(null)

  useEffect(() => {
    if (animRef.current) cancelAnimationFrame(animRef.current)

    if (!inView) {
      setCount(0)
      return
    }

    let startTime = null

    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(end * eased))
      if (progress < 1) animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animRef.current)
  }, [inView, end, duration])

  return [count, ref]
}
