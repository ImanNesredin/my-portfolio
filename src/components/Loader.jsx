import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LightLogo from '../assets/light.svg'

// Smooth container variants
const containerVariants = {
  visible: { opacity: 1, pointerEvents: 'auto' },
  hidden: { opacity: 0, transition: { duration: 0.6 }, pointerEvents: 'none' }
}

export default function Loader({ visible = true }) {
  const quotes = [
    'Welcome to my portfolio',
    'Crafting digital experiences'
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!visible) return
    // cycle quotes every 1400ms; AnimatePresence mode="wait" avoids overlap
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % quotes.length)
    }, 1400)
    return () => clearInterval(interval)
  }, [visible])

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          style={{ background: '#0B0F19' }}
          aria-hidden={!visible}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -6, opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Use CSS-based continuous spin for perfectly smooth rotation */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg
                viewBox="0 0 120 120"
                width="112"
                height="112"
                className="absolute smooth-spin"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#1F67DB" />
                    <stop offset="100%" stopColor="#F6C76A" />
                  </linearGradient>
                </defs>

                <circle cx="60" cy="60" r="44" stroke="rgba(255,255,255,0.06)" strokeWidth="12" fill="none" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="44"
                  stroke="url(#g)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="138.2 200"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: [0, -200] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                />
              </svg>

              {/* inner logo */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-white/6 flex items-center justify-center">
                <img src={LightLogo} alt="logo" className="w-8 h-8" />
              </div>
            </div>

            {/* Rotating/smooth quotes */}
            <div className="h-6">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.42, ease: 'easeInOut' }}
                  className="text-sm text-gray-200 text-center max-w-xs"
                >
                  {quotes[index]}
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}