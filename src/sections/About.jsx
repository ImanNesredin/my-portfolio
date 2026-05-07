import React from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'

export default function About() {

  return (
    <Section id="about" title="About Me">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            I'm a Computer Science & Engineering student passionate about crafting
            modern, accessible web experiences. My journey into development started with a
            curiosity for how things work on the web — and it quickly grew into a deep love
            for building clean, performant interfaces.
          </p>

          <p>
            I practice in the React ecosystem alongside Tailwind CSS, focusing on
            component-driven architecture and thoughtful UX. Whether it's animating micro-interactions,
            optimizing render performance, or designing responsive layouts, I enjoy every part of
            the front-end process.
          </p>

          
        </div>

        
      </motion.div>
    </Section>
  )
}

