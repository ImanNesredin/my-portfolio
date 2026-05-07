import { useEffect, useRef, useState } from 'react'

export default function useInView(options) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setInView(true)
            obs.unobserve(e.target) // one-time reveal
          }
        })
      },
      { threshold: 0.12, ...options }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref.current])

  return [ref, inView]
}