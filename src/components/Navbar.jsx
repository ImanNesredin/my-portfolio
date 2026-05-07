import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DarkLogo from '../assets/dark.svg'
import LightLogo from '../assets/light.svg'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('theme') === 'dark'
  })
  const [scrolled, setScrolled] = useState(false)

  const [closeMode, setCloseMode] = useState('instant')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch (e) {}
  }, [isDark])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open || isAnimating ? 'hidden' : 'auto'
  }, [open, isAnimating])

  const cardVariants = {
    initial: { opacity: 0, scale: 0.98, y: 0 },
    float: {
      opacity: 1,
      scale: 1,
      y: [0, -12, 0], 
      transition: {
        y: { duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
        default: { duration: 0.36, ease: 'easeOut' }
      }
    },
    exitInstant: { opacity: 0, scale: 0.96, transition: { duration: 0.18 } },
    exitSlide: { x: '120%', opacity: 0, transition: { duration: 0.45, ease: 'easeInOut' } }
  }

  const handleHamburger = () => {
    if (open) {
      setCloseMode('slide')
      setIsAnimating(true)
      setOpen(false)
    } else {
      setCloseMode('instant')
      setIsAnimating(true)
      setOpen(true)
    }
  }

  const handleInstantClose = () => {
    setCloseMode('instant')
    setIsAnimating(true)
    setOpen(false)
  }

  return (
    <>
      {/* HEADER */}
      <header
        className={`w-full fixed top-0 z-40 transition-all duration-300
          ${scrolled
            ? 'bg-white/30 dark:bg-[#0B0F19]/30 backdrop-blur-xl shadow-lg'
            : 'bg-white/70 dark:bg-[#0B0F19]/70 backdrop-blur-md'
          }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-3 py-2">
          {/* Logo */}
          <a href="#home" aria-label="Home">
            <img
              src={isDark ? LightLogo : DarkLogo}
              alt="logo"
              className="w-14 h-14 object-contain"
            />
          </a>

          <div className="flex gap-6 items-center">
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 items-center text-sm font-medium">
              <a href="#home" className="text-gray-700 dark:text-gray-200">Home</a>
              <a href="#about" className="text-gray-700 dark:text-gray-200">About</a>
              <a href="#projects" className="text-gray-700 dark:text-gray-200">Projects</a>
              <a href="#skills" className="text-gray-700 dark:text-gray-200">Skills</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-200">Contact</a>
            </nav>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(v => !v)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 0111.21 3c0-.34.02-.67.05-1A9 9 0 1021 12.79z" />
                </svg>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2"
              onClick={handleHamburger}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence
        onExitComplete={() => {
          setIsAnimating(false)
        }}
      >
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={closeMode === 'slide'
              ? { opacity: [1, 1, 0], transition: { duration: 0.45, ease: 'easeInOut', times: [0, 0.92, 1] } }
              : { opacity: 0, transition: { duration: 0.22 } }
            }
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            onClick={handleInstantClose} 
          >
            <motion.div
              className="glass-card mobile-menu-card w-[88%] max-w-sm mx-4 p-6 backdrop-blur-sm relative bg-white/20 dark:bg-[#0B0F19]/20"
              variants={cardVariants}
              initial="initial"
              animate="float" 
              exit={closeMode === 'slide' ? 'exitSlide' : 'exitInstant'}
              transition={{ duration: 0.36, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >

              <div className="flex flex-col items-center justify-center h-[80%] gap-6 text-lg font-medium my-8">
                <a href="#home" onClick={() => { setCloseMode('instant'); setIsAnimating(true); setOpen(false) }} className="text-gray-700 dark:text-gray-200 hover:scale-105 transition">Home</a>
                <a href="#about" onClick={() => { setCloseMode('instant'); setIsAnimating(true); setOpen(false) }} className="text-gray-700 dark:text-gray-200 hover:scale-105 transition">About</a>
                <a href="#projects" onClick={() => { setCloseMode('instant'); setIsAnimating(true); setOpen(false) }} className="text-gray-700 dark:text-gray-200 hover:scale-105 transition">Projects</a>
                <a href="#skills" onClick={() => { setCloseMode('instant'); setIsAnimating(true); setOpen(false) }} className="text-gray-700 dark:text-gray-200 hover:scale-105 transition">Skills</a>
                <a href="#contact" onClick={() => { setCloseMode('instant'); setIsAnimating(true); setOpen(false) }} className="text-gray-700 dark:text-gray-200 hover:scale-105 transition">Contact</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}