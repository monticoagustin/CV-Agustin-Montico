import { motion } from 'framer-motion'
import { MapPin, Calendar, Trophy } from 'lucide-react'
import { experience } from '../data'
import { useRipple } from '../hooks/useRipple'
import TiltCard from './TiltCard'

const fadeUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

export default function Experience() {
  const ripple = useRipple('rgba(0,120,212,0.12)')

  return (
    <section
      id="experience"
      style={{
        background: 'rgba(255,255,255,0.008)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p className="sec-label" variants={fadeUp}>Career</motion.p>

          <motion.h2
            className="sec-title"
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1], delay: 0.1 }}
          >
            Work Experience
          </motion.h2>

          <div className="experience__timeline">
            {/* Animated timeline line — replaces CSS ::before */}
            <motion.div
              className="timeline-line"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {experience.map((exp) => (
              <motion.div className="exp-item" key={exp.id} variants={fadeUp}>
                <div className="exp-dot-col">
                  <motion.div
                    className={`exp-dot${exp.current ? ' exp-dot--current' : ''}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 }}
                  />
                </div>

                <TiltCard className="card exp-card" onClick={ripple} intensity={5}>
                  <div className="exp-card__header">
                    <div className="exp-card__company">
                      {exp.company}
                      {exp.current && (
                        <span className="badge badge-green" style={{ fontSize: '0.68rem', padding: '0.18rem 0.6rem' }}>
                          Current
                        </span>
                      )}
                    </div>
                    <div className="exp-card__role">
                      {exp.role}
                      {exp.dept && (
                        <span style={{ color: 'var(--text-2)', fontWeight: 400, fontSize: '0.95rem' }}>
                          {' '}— {exp.dept}
                        </span>
                      )}
                    </div>
                    <div className="exp-card__meta">
                      <span className="exp-card__meta-item"><Calendar size={12} />{exp.period}</span>
                      <span className="exp-card__meta-item"><MapPin size={12} />{exp.location}</span>
                    </div>
                  </div>

                  <div className="exp-card__bullets">
                    {exp.bullets.map((b, i) => (
                      <div className="exp-card__bullet" key={i}>{b}</div>
                    ))}
                  </div>

                  {exp.id === 2 && (
                    <div className="exp-card__award">
                      <Trophy size={11} />
                      KPI Championship Winner 2022–2023
                    </div>
                  )}
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
