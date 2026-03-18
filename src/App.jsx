import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Marquee from './components/Marquee'
import Education from './components/Education'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import CursorGlow from './components/CursorGlow'
import Loader from './components/Loader'
import BackToTop from './components/BackToTop'

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {/* Noise overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px',
          opacity: 0.022,
          pointerEvents: 'none',
          zIndex: 9997,
        }}
      />

      {/* Loader */}
      <AnimatePresence>
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Site — renders after loader */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Marquee />
            <Education />
            <Contact />
          </main>
          <footer>
            <div className="container">
              Designed & built by <span>Claude</span> for <span>Agustin Montico</span> &mdash;{' '}
              {new Date().getFullYear()}
            </div>
          </footer>
          <BackToTop />
        </motion.div>
      )}
    </>
  )
}
