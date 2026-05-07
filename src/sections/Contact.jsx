import React, { useRef, useState, useEffect } from 'react'
import Section from '../components/Section'

/* Icons (same as your SVGs) */
function MailIcon(props) { /* same SVG as before */ return (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)}

function GithubIcon(props) { /* ... */ return (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)}

function LinkedinIcon(props) { /* ... */ return (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)}

function TelegramIcon(props) { /* ... */ return (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.004 0C5.374 0 0 5.374 0 12.004 0 18.634 5.374 24.01 12.004 24.01c6.63 0 12.01-5.376 12.01-12.006C24.014 5.374 18.634 0 12.004 0zm5.43 8.065l-2.12 9.97c-.16.73-.58.9-1.18.56l-3.26-2.4-1.57 1.51c-.17.17-.31.31-.63.31l.23-3.39 6.18-5.58c.27-.24-.06-.37-.42-.13l-7.64 4.8L6.98 12c-.66-.21-.67-.66.14-.98l10.66-4.1c.48-.19.9.12.58.77z"/>
  </svg>
)}

export default function Contact() {
  const [openForm, setOpenForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [errors, setErrors] = useState({})
  const firstInputRef = useRef(null)
  const overlayRef = useRef(null)

  const GITHUB_URL = 'https://github.com'
  const LINKEDIN_URL = 'https://linkedin.com'
  const TELEGRAM_URL = 'https://t.me/your_username'
  const MAILTO_ADDR = 'D.Nesami77@gmail.com'

  useEffect(() => {
    if (openForm && firstInputRef.current) firstInputRef.current.focus()
  }, [openForm])

  // close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') handleClose()
    }
    if (openForm) {
      window.addEventListener('keydown', onKey)
      return () => window.removeEventListener('keydown', onKey)
    }
  }, [openForm])

  // lock body scroll while open
  useEffect(() => {
    const original = document.body.style.overflow
    if (openForm) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original || '' }
  }, [openForm])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.email.trim()) e.email = 'Please enter your email'
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(form.email)) e.email = 'Please enter a valid email'
    }
    if (!form.message.trim() && !form.topic.trim()) e.message = 'Please tell me what you want to talk about'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const eobj = validate()
    setErrors(eobj)
    if (Object.keys(eobj).length > 0) return

    setSubmitting(true)
    const subject = encodeURIComponent(form.topic || 'Website inquiry')
    const bodyLines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      '',
      'Message:',
      form.message
    ]
    const body = encodeURIComponent(bodyLines.join('\n'))
    const mailto = `mailto:${MAILTO_ADDR}?subject=${subject}&body=${body}`
    window.location.href = mailto

    setTimeout(() => {
      setSubmitting(false)
      handleClose()
    }, 600)
  }

  function handleOverlayMouseDown(e) {
    // only close when user clicks directly the backdrop
    if (e.target === overlayRef.current) handleClose()
  }

  function handleClose() {
    // blur anything focused (prevent caret left behind)
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    setOpenForm(false)
    setForm({ name: '', email: '', topic: '', message: '' })
    setErrors({})
    setSubmitting(false)
  }

  return (
    <Section id="contact" title="Contact" titleAlign="center">
      <div className="text-center">
        <p className="mt-2 text-gray-600 dark:text-gray-400">Let's build something great together.</p>

        <div className="mt-8 flex items-center justify-center gap-12">
          <a
            href={`mailto:${MAILTO_ADDR}`}
            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/60 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-white/15 transition backdrop-blur-sm"
            aria-label={`Send email to ${MAILTO_ADDR}`}
          >
            <MailIcon className="w-5 h-5 text-primary" />
            <span className="sr-only">{MAILTO_ADDR}</span>
          </a>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/60 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-white/15 transition backdrop-blur-sm"
            aria-label="Open Telegram"
          >
            <TelegramIcon className="w-5 h-5" />
            <span className="sr-only">Telegram</span>
          </a>
        
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/60 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/15 transition backdrop-blur-sm"
            aria-label="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/60 dark:bg-white/10 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/15 transition backdrop-blur-sm"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setOpenForm(true)}
            className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition"
            aria-haspopup="dialog"
          >
            Have a question?
          </button>
        </div>
      </div>


      {openForm && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          onMouseDown={handleOverlayMouseDown}
        >
          <form
            className="glass-card no-hover w-[92%] max-w-2xl mx-4 p-6 relative"
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close form"
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-200 hover:scale-105 transition"
              onClick={handleClose}
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Ask me anything</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Send a quick message and I'll get back to you.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">Your name</span>
                <input
                  ref={firstInputRef}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="px-3 py-1 rounded-md bg-white/60 dark:bg-white/6 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                  required
                />
                {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
              </label>

              <label className="flex flex-col">
                <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">Your email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="px-3 py-1 rounded-md bg-white/60 dark:bg-white/6 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                  required
                />
                {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
              </label>

              <label className="flex flex-col md:col-span-2">
                <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">Topic</span>
                <input
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                  className="px-3 py-1 rounded-md bg-white/60 dark:bg-white/6 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="What do you want to talk about?"
                />
              </label>

              <label className="flex flex-col md:col-span-2">
                <span className="text-sm text-gray-600 dark:text-gray-300 mb-1">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="px-3 py-1 rounded-md bg-white/60 dark:bg-white/6 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tell me about your project or question..."
                />
                {errors.message && <span className="text-xs text-red-500 mt-1">{errors.message}</span>}
              </label>
            </div>

            <div className="mt-6 flex items-center gap-3 justify-end">
              <button
                type="button"
                className="px-4 py-1 rounded-md bg-white/60 dark:bg-white/8 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-white/12 transition"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-primary text-white hover:opacity-95 transition"
                disabled={submitting}
              >
                {submitting ? 'Sending…' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      )}
    </Section>
  )
}