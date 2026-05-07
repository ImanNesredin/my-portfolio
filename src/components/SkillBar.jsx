import React from 'react'
import { motion } from 'framer-motion'
import useInView from '../hooks/useInView'

export default function SkillBar({ name, level = 0, icon, color = '#1F67DB' }) {
  const [ref, inView] = useInView({ threshold: 0.25 })

  const IconComp = icon

  return (
    <div ref={ref} className="mb-4">
      <div className="grid grid-cols-[auto_1fr] gap-8 items-center">
        <div className="flex items-center gap-3 mb-2">
          {IconComp ? (
            typeof IconComp === 'function' ? (
              <IconComp aria-label={name} title={name} size={26} style={{ color }} />
            ) : (
              <img src={IconComp} alt={name} className="w-8 h-8 rounded" />
            )
          ) : (
            <div className="w-8 h-8 mb-4 bg-gray-300 rounded" aria-hidden="true" />
          )}

          <span className="sr-only">{name}</span>
        </div>

        <span className="sr-only">{level}%</span>
      </div>

      <div
        className="relative w-full h-4 md:h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
        aria-label={`${name} proficiency`}
      >
        <motion.div
          className="h-full rounded origin-left"
          style={{ backgroundColor: color, transformOrigin: '0% 50%', willChange: 'transform' }}
          initial={{ scaleX: 0, x: -6, opacity: 0.95 }}
          animate={inView ? { scaleX: level / 100, x: 0, opacity: 1 } : { scaleX: 0, x: -6, opacity: 0.95 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={inView ? level : 0}
        />
      </div>
    </div>
  )
}