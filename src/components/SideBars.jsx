import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Linkedin, Mail, Phone } from 'lucide-react'
import { personal } from '../data'

const sideVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 1, duration: 0.8 } },
}

// Each icon lights up at a scroll depth threshold (0-1)
const iconThresholds = [0, 0.3, 0.6]

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

export default function SideBars() {
  const scrollProgress = useScrollProgress()

  return (
    <>
      {/* LEFT — social icons */}
      <motion.div
        variants={sideVariant}
        initial="hidden"
        animate="visible"
        className="sidebars-hide"
        style={{
          position: 'fixed',
          bottom: 0,
          left: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.1rem',
          zIndex: 40,
        }}
      >
        {[
          { icon: Linkedin, href: personal.linkedinUrl, label: 'LinkedIn' },
          { icon: Mail, href: personal.gmailUrl, label: 'Email' },
          { icon: Phone, href: personal.whatsappUrl, label: 'WhatsApp' },
        ].map(({ icon: Icon, href, label }, i) => {
          const active = scrollProgress >= iconThresholds[i]
          return (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              whileHover={{ y: -4 }}
              animate={{
                color: active ? '#4da6ff' : 'var(--text-3)',
                filter: active ? 'drop-shadow(0 0 6px rgba(0,120,212,0.7))' : 'none',
              }}
              transition={{ duration: 0.4 }}
              style={{ display: 'flex' }}
            >
              <Icon size={17} />
            </motion.a>
          )
        })}

        {/* Vertical line */}
        <div style={{
          width: '1px',
          height: '90px',
          background: 'linear-gradient(to bottom, var(--text-3), transparent)',
        }} />
      </motion.div>

      {/* RIGHT — email vertical */}
      <motion.div
        variants={sideVariant}
        initial="hidden"
        animate="visible"
        className="sidebars-hide"
        style={{
          position: 'fixed',
          bottom: 0,
          right: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.1rem',
          zIndex: 40,
        }}
      >
        <motion.a
          href={personal.gmailUrl}
          target="_blank"
          rel="noreferrer"
          whileHover={{ color: 'var(--azure-light)' }}
          style={{
            writingMode: 'vertical-rl',
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            color: 'var(--text-2)',
            fontFamily: 'var(--font-sans)',
            transition: 'color 0.2s ease',
          }}
        >
          {personal.email}
        </motion.a>

        {/* Vertical line */}
        <div style={{
          width: '1px',
          height: '90px',
          background: 'linear-gradient(to bottom, var(--text-3), transparent)',
        }} />
      </motion.div>
    </>
  )
}
