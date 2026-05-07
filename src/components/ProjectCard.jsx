import React from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ title, description, tech = [], image = '', link = '#' }) {
  return (
    <motion.article
      className="relative rounded-lg shadow-md overflow-hidden min-h-[20rem]"
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className='pb-6 bg-white dark:bg-[#0b1220]'>
        <div className="h-44 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{title}</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {tech.map((t) => (
              <span key={t} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute glass-card bottom-23 pointer-events-auto">
        <a
          href={link}
          className="block bg-white/20 dark:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-3 text-primary font-medium hover:bg-white dark:hover:bg-white/20 transition-all shadow-lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          View project →
        </a>
      </div>
    </motion.article>
  )
}