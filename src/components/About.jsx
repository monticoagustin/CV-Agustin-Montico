import { useRef } from 'react'
import { motion } from 'framer-motion'
import { stats } from '../data'
import TiltCard from './TiltCard'
import { useCounter } from '../hooks/useCounter'

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function AnimatedStat({ value, label }) {
  const numMatch = value.match(/^(\d+)(.*)$/)
  const isNumeric = !!numMatch
  const numEnd = isNumeric ? parseInt(numMatch[1]) : 0
  const suffix = isNumeric ? numMatch[2] : ''

  const [count, ref] = useCounter(numEnd, 1800)

  return (
    <TiltCard className="card about__stat" intensity={6}>
      <div className="about__stat-value" ref={ref}>
        {isNumeric ? `${count}${suffix}` : value}
      </div>
      <div className="about__stat-label">{label}</div>
    </TiltCard>
  )
}

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p className="sec-label" variants={fadeUp}>About Me</motion.p>

          <motion.h2
            className="sec-title"
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1], delay: 0.1 }}
          >
            Professional Profile
          </motion.h2>

          <div className="about__grid">
            <motion.div variants={fadeUp}>
              <p className="about__text">
                IT professional with experience in corporate environments, oriented toward a{' '}
                <strong>Junior Cloud Engineer</strong> role. Experienced in{' '}
                <strong>Azure</strong>, support and monitoring of Microsoft platforms, and incident
                management in production environments.
              </p>
              <br />
              <p className="about__text">
                <strong>Microsoft Azure AZ-104</strong> certified, with a solid technical
                foundation to add value to cloud teams, focused on operations, analysis, and
                continuous improvement. Bilingual professional with{' '}
                <strong>Cambridge B2</strong> certification in English.
              </p>
            </motion.div>

            <motion.div className="about__stats" variants={stagger}>
              {stats.map((s, i) => (
                <motion.div key={i} variants={fadeUp}>
                  <AnimatedStat value={s.value} label={s.label} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
