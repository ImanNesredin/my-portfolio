import React, { useState, useEffect } from 'react'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import projects from '../data/projects'
import { motion, AnimatePresence } from 'framer-motion'

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && projects.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
      }
    }, 4000) // slightly slower so transitions are visible

    return () => clearInterval(interval)
  }, [projects.length, isPaused])

  return (
    <Section id="projects" title="Projects" titleAlign="center">
      <div
        className="relative max-w-4xl mx-auto overflow-hidden min-h-[22rem] rounded-3xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full rounded-3xl shadow-2xl"
          >
            <ProjectCard {...projects[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)}
          className="p-3 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full text-2xl hover:bg-white/40 dark:hover:bg-white/20 transition-all flex-shrink-0"
          aria-label="Previous project"
        >
          ‹
        </button>

        {/* Indicators */}
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300 dark:bg-gray-600'}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show project ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % projects.length)}
          className="p-3 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full text-2xl hover:bg-white/40 dark:hover:bg-white/20 transition-all flex-shrink-0"
          aria-label="Next project"
        >
          ›
        </button>
      </div>
    </Section>
  )
}