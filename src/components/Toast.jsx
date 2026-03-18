import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

export default function Toast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            x: '-50%',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.7rem 1.25rem',
            background: 'rgba(10,10,26,0.92)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '100px',
            backdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(16,185,129,0.1)',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#e2eaff',
            whiteSpace: 'nowrap',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.1 }}
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(16,185,129,0.15)',
              border: '1px solid rgba(16,185,129,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6ee7b7',
            }}
          >
            <Check size={11} strokeWidth={3} />
          </motion.div>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
