import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import SpaceBackground from './components/SpaceBackground'
import Hero from './sections/Hero'
import About from './sections/About'
import Education from './sections/Education'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <Loader visible={loading} />
      <div className={loading ? 'pointer-events-none' : ''}>
        <Navbar />
        <SpaceBackground />
        <main className="min-h-screen relative z-10 bg-none transition-colors duration-300">
          <Hero />
          <About />
          <Education />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </>
  )
}

