import React from 'react'

export default function Section({ title, children, id, className = '' }) {
  return (
    <section id={id} className={`py-16 ${className}`}>
      <div className="max-w-5xl mx-auto px-4">
        {title && (
          <h2 className="mb-6 text-4xl sm:text-5xl font-extrabold section-title leading-tight text-center text-gray-900 dark:text-white">
            {title}
          </h2>
        )}

        <div className="glass-card">
          {children}
        </div>
      </div>
    </section>
  )
}