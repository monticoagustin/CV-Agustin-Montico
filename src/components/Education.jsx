import { motion } from 'framer-motion'
import { GraduationCap, Award, Cloud, Globe, BarChart2 } from 'lucide-react'

const certIcons = {
  cloud: Cloud,
  globe: Globe,
  chart: BarChart2,
}
import { education, certifications } from '../data'
import TiltCard from './TiltCard'

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function Education() {
  return (
    <section
      id="education"
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
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p className="sec-label" variants={fadeUp}>
            Background
          </motion.p>

          <motion.h2
            className="sec-title"
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1], delay: 0.1 }}
          >
            Education & Certifications
          </motion.h2>

          {/* Education */}
          <motion.div variants={fadeUp} style={{ marginBottom: '0.75rem' }}>
            <div className="skills__cat-title">Education</div>
          </motion.div>
          <motion.div className="edu__grid" variants={stagger}>
            {education.map((edu, i) => (
              <motion.div key={i} variants={fadeUp}>
                <TiltCard className="card edu-card" intensity={5}>
                  <div className="edu-card__icon">
                    <GraduationCap size={20} />
                  </div>
                  <div className="edu-card__degree">{edu.degree}</div>
                  <div className="edu-card__institution">{edu.institution}</div>
                  <div className="edu-card__meta">
                    <span>{edu.year}</span>
                    <span>·</span>
                    <span>{edu.location}</span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div variants={fadeUp} style={{ marginBottom: '0.75rem' }}>
            <div className="skills__cat-title">Certifications</div>
          </motion.div>
          <motion.div className="cert__grid" variants={stagger}>
            {certifications.map((cert, i) => (
              <motion.div key={i} variants={fadeUp}>
                <TiltCard
                  className={`card cert-card${cert.highlight ? ' cert-card--highlight' : ''}`}
                  intensity={6}
                >
                  <div className="cert-card__icon">
                    {(() => { const Icon = certIcons[cert.icon]; return Icon ? <Icon size={22} /> : null })()}
                  </div>
                  <div className="cert-card__name">{cert.name}</div>
                  <div className="cert-card__issuer">{cert.issuer}</div>
                  {cert.highlight && (
                    <span className="badge badge-azure" style={{ fontSize: '0.7rem' }}>
                      <Award size={10} />
                      Certified
                    </span>
                  )}
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
