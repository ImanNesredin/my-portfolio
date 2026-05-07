import React from 'react'

export default function Button({ children, href = '#', onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow hover:shadow-md transition"
    >
      {children}
    </a>
  )
}