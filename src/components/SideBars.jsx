import { motion } from 'framer-motion'
import { Linkedin, Mail, Phone } from 'lucide-react'
import { personal } from '../data'

const sideVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 1, duration: 0.8 } },
}

export default function SideBars() {
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
        <motion.a
          href={personal.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          whileHover={{ y: -4, color: 'var(--azure-light)' }}
          style={{ color: 'var(--text-2)', transition: 'color 0.2s ease' }}
        >
          <Linkedin size={17} />
        </motion.a>

        <motion.a
          href={`mailto:${personal.email}`}
          aria-label="Email"
          whileHover={{ y: -4, color: 'var(--azure-light)' }}
          style={{ color: 'var(--text-2)', transition: 'color 0.2s ease' }}
        >
          <Mail size={17} />
        </motion.a>

        <motion.a
          href={`tel:${personal.phone.replace(/\s/g, '')}`}
          aria-label="Phone"
          whileHover={{ y: -4, color: 'var(--azure-light)' }}
          style={{ color: 'var(--text-2)', transition: 'color 0.2s ease' }}
        >
          <Phone size={17} />
        </motion.a>

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
          href={`mailto:${personal.email}`}
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
