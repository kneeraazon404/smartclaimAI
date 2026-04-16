'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle } from 'lucide-react'

const inquiryOptions = [
  { value: 'demo', label: 'Demo Request' },
  { value: 'enterprise', label: 'Enterprise / Multi-Clinic Plan' },
  { value: 'support', label: 'Technical Support' },
  { value: 'general', label: 'General Inquiry' },
]

interface FormState {
  name: string
  email: string
  organization: string
  inquiry: string
  message: string
}

const INITIAL: FormState = {
  name: '',
  email: '',
  organization: '',
  inquiry: '',
  message: '',
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Failed to send message. Please try again.')
        return
      }

      setSuccess(true)
      setForm(INITIAL)
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 text-center bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800">
        <div
          className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-5"
          aria-hidden="true"
        >
          <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Message Received!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm leading-relaxed">
          Thank you for reaching out. We&apos;ll review your message and get back to you within
          one business day.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-6 px-6 py-2.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-full text-sm font-medium hover:bg-black dark:hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm'

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 md:p-8">
      {error && (
        <div
          role="alert"
          className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900/30"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Dr. Jane Smith"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="doctor@clinic.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Organization */}
          <div className="space-y-1.5">
            <label htmlFor="contact-org" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Organization <span className="text-gray-400 dark:text-gray-500 font-normal">(optional)</span>
            </label>
            <input
              id="contact-org"
              name="organization"
              type="text"
              autoComplete="organization"
              placeholder="Wound Care Clinic"
              value={form.organization}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Inquiry type */}
          <div className="space-y-1.5">
            <label htmlFor="contact-inquiry" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Inquiry Type <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <select
              id="contact-inquiry"
              name="inquiry"
              required
              value={form.inquiry}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" disabled>
                Select inquiry type…
              </option>
              {inquiryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="contact-message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Message <span aria-hidden="true" className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            minLength={10}
            placeholder="Tell us how we can help…"
            value={form.message}
            onChange={handleChange}
            className={`${inputClass} resize-y`}
          />
        </div>

        <div className="flex items-center justify-between gap-4 pt-1">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Do not include patient PHI in this form.
          </p>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-7 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 text-sm"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
