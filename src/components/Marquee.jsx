import { motion } from 'framer-motion'
import { technicalSkills, softSkills } from '../data'

const row1 = technicalSkills.map((s) => s.name)
const row2 = [...softSkills, ...technicalSkills.slice(0, 6).map((s) => s.name)]

function MarqueeTrack({ items, reverse = false, speed = 40 }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-outer">
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="marquee-pill">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
      style={{
        padding: '2.5rem 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem',
      }}
    >
      <MarqueeTrack items={row1} speed={35} />
      <MarqueeTrack items={row2} reverse speed={42} />
    </motion.div>
  )
}
