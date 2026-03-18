import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Linkedin, MapPin, Phone } from 'lucide-react'
import { personal } from '../data'
import { useRipple } from '../hooks/useRipple'
import TiltCard from './TiltCard'
import Toast from './Toast'

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function ContactCard({ icon: Icon, label, value, href, onClick }) {
  const ripple = useRipple('rgba(0,120,212,0.15)')

  const handleClick = (e) => {
    ripple(e)
    if (onClick) onClick()
  }

  const inner = (
    <TiltCard className="card contact-card" onClick={handleClick} intensity={4}>
      <div className="contact-card__icon">
        <Icon size={20} />
      </div>
      <div>
        <div className="contact-card__label">{label}</div>
        <div className="contact-card__value">{value}</div>
      </div>
    </TiltCard>
  )

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
        {inner}
      </a>
    )
  }

  return inner
}

export default function Contact() {
  const [toastVisible, setToastVisible] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }

  return (
    <section id="contact">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.p className="sec-label" variants={fadeUp}>Let's Connect</motion.p>

          <motion.h2
            className="sec-title"
            initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1], delay: 0.1 }}
          >
            Get In Touch
          </motion.h2>

          <motion.div className="contact__grid" variants={stagger}>
            <motion.div variants={fadeUp}>
              <ContactCard icon={Mail} label="Email — click to copy" value={personal.email} onClick={copyEmail} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <ContactCard icon={Linkedin} label="LinkedIn" value={personal.linkedin} href={personal.linkedinUrl} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <ContactCard icon={Phone} label="Phone" value={personal.phone} href={`tel:${personal.phone.replace(/\s/g, '')}`} />
            </motion.div>
            <motion.div variants={fadeUp}>
              <ContactCard icon={MapPin} label="Location" value={personal.location} />
            </motion.div>
          </motion.div>

          <motion.div className="contact__footer" variants={fadeUp}>
            <p>
              Currently based in <strong style={{ color: 'var(--text)' }}>Rosario, Argentina</strong>.
              Available for remote and on-site opportunities.{' '}
              <a href={`mailto:${personal.email}`}>Send me an email →</a>
            </p>
          </motion.div>
        </motion.div>
      </div>

      <Toast message="Email copied to clipboard!" visible={toastVisible} />
    </section>
  )
}
