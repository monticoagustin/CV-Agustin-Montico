import { motion } from 'framer-motion'
import { technicalSkills, softSkills } from '../data'
import { useRipple } from '../hooks/useRipple'

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const pillVariant = {
  hidden: { scale: 0.8, opacity: 0, y: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function Skills() {
  const ripple = useRipple('rgba(0,120,212,0.2)')

  return (
    <section id="skills">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p className="sec-label" variants={fadeUp}>
            Capabilities
          </motion.p>

          <motion.h2
            className="sec-title"
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1], delay: 0.1 }}
          >
            Skills & Expertise
          </motion.h2>

          {/* Technical Skills */}
          <div className="skills__section">
            <div className="skills__cat-title">Technical Skills</div>
            <motion.div className="skills__pills" variants={stagger}>
              {technicalSkills.map((skill) => (
                <motion.span
                  key={skill.name}
                  className={`pill${skill.highlight ? ' pill-highlight' : ''}`}
                  variants={pillVariant}
                  whileHover={{
                    scale: 1.08,
                    y: -4,
                    boxShadow: '0 6px 20px rgba(0,120,212,0.2)',
                    transition: { type: 'spring', stiffness: 400, damping: 18 },
                  }}
                  whileTap={{ scale: 0.94 }}
                  onClick={ripple}
                  style={{ cursor: 'default' }}
                >
                  {skill.highlight && (
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--azure-light)',
                        display: 'inline-block',
                        marginRight: '0.3rem',
                      }}
                    />
                  )}
                  {skill.name}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Soft Skills */}
          <div className="skills__section">
            <div className="skills__cat-title">Soft Skills</div>
            <motion.div className="skills__pills" variants={stagger}>
              {softSkills.map((skill) => (
                <motion.span
                  key={skill}
                  className="pill"
                  variants={pillVariant}
                  whileHover={{
                    scale: 1.08,
                    y: -4,
                    transition: { type: 'spring', stiffness: 400, damping: 18 },
                  }}
                  whileTap={{ scale: 0.94 }}
                  onClick={ripple}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
