import React from 'react'
import Section from '../components/Section'
import { motion } from 'framer-motion'

export default function Education() {

  return (
    <Section id="education" title="Education">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        
        <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            I am currently pursuing a Bachelor’s degree in Computer Science and Engineering at Adama Science and Technology University. 
            My studies focus on core computer science fundamentals including data structures, algorithms, software engineering, databases, and networking.
          </p>

          <p>
            Alongside my academic coursework, I actively build practical projects in web development to strengthen my understanding of real-world software systems and modern frontend technologies such as React and Tailwind CSS.
         </p>
          
        </div>

        
      </motion.div>
    </Section>
  )
}

