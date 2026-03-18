import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Mail, Linkedin, MapPin, Phone, ChevronDown, Download } from 'lucide-react'
import { personal } from '../data'
import { useRipple } from '../hooks/useRipple'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const item = {
  hidden: { y: 32, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function Hero() {
  const ripple = useRipple()
  const rippleBlue = useRipple('rgba(0,120,212,0.25)')

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const nameX = useTransform(springX, [-1, 1], [-12, 12])
  const nameY = useTransform(springY, [-1, 1], [-8, 8])
  const titleX = useTransform(springX, [-1, 1], [-7, 7])
  const titleY = useTransform(springY, [-1, 1], [-5, 5])
  const contactX = useTransform(springX, [-1, 1], [-4, 4])
  const contactY = useTransform(springY, [-1, 1], [-3, 3])
  const orb1X = useTransform(springX, [-1, 1], [-30, 30])
  const orb1Y = useTransform(springY, [-1, 1], [-20, 20])
  const orb2X = useTransform(springX, [-1, 1], [20, -20])
  const orb2Y = useTransform(springY, [-1, 1], [15, -15])

  useEffect(() => {
    const onMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <section className="hero" id="hero">
      {/* Parallax orbs */}
      <motion.div
        style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: '60vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,120,212,0.1) 0%, transparent 65%)',
          pointerEvents: 'none', x: orb1X, y: orb1Y,
        }}
      />
      <motion.div
        style={{
          position: 'absolute', bottom: '0%', right: '-10%',
          width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,188,242,0.07) 0%, transparent 65%)',
          pointerEvents: 'none', x: orb2X, y: orb2Y,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div className="hero__content" variants={container} initial="hidden" animate="show">
          {/* Available badge */}
          <motion.div className="hero__top" variants={item}>
            <div className="hero__available">
              <span className="hero__available-dot" />
              Open to new opportunities
            </div>
            <div className="badge badge-azure">
              <span className="hero__azure-dot" />
              AZ-104 Certified
            </div>
          </motion.div>

          {/* Name */}
          <motion.div variants={item} style={{ x: nameX, y: nameY }}>
            <h1 className="hero__name">
              <span>Agustin</span>
              <span style={{
                WebkitTextFillColor: 'transparent', color: 'transparent',
                background: 'linear-gradient(135deg, #e2eaff 0%, #4da6ff 55%, #00bcf2 100%)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                display: 'block', lineHeight: '1.05',
              }}>
                Montico
              </span>
            </h1>
          </motion.div>

          {/* Role badges */}
          <motion.div variants={item} style={{ x: titleX, y: titleY, display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            <div className="hero__role-badge hero__role-badge--primary">
              <span className="hero__azure-dot" />
              Cloud & Security Analyst
            </div>
            <div className="hero__role-badge">
              ☁️ Azure Administrator
            </div>
          </motion.div>

          {/* Summary */}
          <motion.p className="hero__summary" variants={item}>
            IT professional with experience in corporate environments. Specialized in{' '}
            <strong style={{ color: 'var(--azure-light)', fontWeight: 600 }}>
              Azure infrastructure
            </strong>
            , platform monitoring, and incident management. Focused on operations, analysis, and
            continuous improvement.
          </motion.p>

          {/* Contact */}
          <motion.div className="hero__contacts" variants={item} style={{ x: contactX, y: contactY }}>
            <a href={personal.gmailUrl} target="_blank" rel="noreferrer" className="hero__contact-item">
              <Mail size={14} />{personal.email}
            </a>
            <a href={personal.linkedinUrl} target="_blank" rel="noreferrer" className="hero__contact-item">
              <Linkedin size={14} />LinkedIn
            </a>
            <span className="hero__contact-item">
              <MapPin size={14} />{personal.location}
            </span>
            <a href={personal.whatsappUrl} target="_blank" rel="noreferrer" className="hero__contact-item">
              <Phone size={14} />{personal.phone}
            </a>
          </motion.div>

          {/* CTA */}
          <motion.div className="hero__cta" variants={item}>
            <motion.a href="#experience" className="btn btn-primary" onClick={ripple}
              whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(0,120,212,0.45)' }}
              whileTap={{ scale: 0.96 }}>
              View Experience
            </motion.a>
            <motion.a href="#contact" className="btn btn-outline" onClick={rippleBlue}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              Get in Touch
            </motion.a>
            <motion.a href="/Agustin_Montico(CV-English).pdf" download className="btn btn-outline"
              onClick={rippleBlue} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Download size={14} />Download CV
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="hero__scroll"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}>
        <span>Scroll</span>
        <div className="hero__scroll-line" />
        <ChevronDown size={12} />
      </motion.div>
    </section>
  )
}
