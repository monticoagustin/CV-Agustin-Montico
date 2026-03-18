import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRipple } from '../hooks/useRipple'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const ripple = useRipple('rgba(0,120,212,0.2)')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60)
      const sections = navLinks.map((l) => l.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 180) {
          setActive(id)
          return
        }
      }
      setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="navbar__inner container">
          <a href="#" className="navbar__logo" onClick={ripple}>
            <div className="navbar__initials">AM</div>
            <span className="navbar__name">Agustin Montico</span>
          </a>

          <ul className="navbar__links">
            {navLinks.map(({ href, label }) => (
              <li key={href} style={{ position: 'relative' }}>
                <a
                  href={href}
                  className={`navbar__link${active === href.slice(1) ? ' navbar__link--active' : ''}`}
                  onClick={ripple}
                >
                  {label}
                  {/* Animated active pill */}
                  {active === href.slice(1) && (
                    <motion.div
                      layoutId="nav-pill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 8,
                        background: 'var(--azure-10)',
                        border: '1px solid var(--azure-20)',
                        zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                className="btn btn-primary"
                onClick={ripple}
                style={{ fontSize: '0.82rem', padding: '0.5rem 1.1rem' }}
              >
                Hire Me
              </a>
            </li>
          </ul>

          <button
            className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="navbar__mobile"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {navLinks.map(({ href, label }) => (
                <a key={href} href={href} className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <a
                href="#contact"
                className="navbar__mobile-link"
                style={{ color: 'var(--azure-light)' }}
                onClick={() => setMenuOpen(false)}
              >
                Hire Me →
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}
