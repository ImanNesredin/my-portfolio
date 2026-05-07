import React from 'react'
import Section from '../components/Section'
import SkillBar from '../components/SkillBar'
import skills from '../data/skills'
import { motion } from 'framer-motion'

export default function Skills() {
return (
    <Section id="skills" title="Skills">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        
        

        <div className="max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-x-40 gap-y-8">
          {skills.map((s) => (
            <SkillBar key={s.name} {...s} />
          ))}
        </div>
      </motion.div>
    </Section>
  )
}