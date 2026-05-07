import React from 'react'
import Section from '../components/Section'
import Button from '../components/Button'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <Section id="home" className="pt-24">
      <div className="min-h-[calc(100vh-12rem)] flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.h1
              initial={{ scale: 0.995 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white"
            >
              Hi, I'm Iman Nesredin
            </motion.h1>

            <p className="text-lg text-gray-700 dark:text-gray-300">
              CSE student focused on modern front-end development — React, Tailwind, and thoughtful UX.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Currently expanding into Web3 development
            </p>

            <div className="flex items-center gap-4">
              <Button href="#projects">View Projects</Button>
              <a href="#contact" className="text-sm text-gray-600 dark:text-gray-300 hover:underline">Get in touch</a>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="w-64 h-64 overflow-hidden bg-transparent flex items-center justify-center relative cursor-pointer group"
              whileHover={{ rotateY: 180, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src="/src/assets/helloMe/android-animate.svg" 
                alt="Android animation"
                className="w-full h-full object-contain group-hover:hidden"
              />
              <img 
                src="/src/assets/helloMe/android-animate2.svg" 
                alt="Android animation 2"
                className="w-full h-full object-contain hidden group-hover:block absolute inset-0"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}