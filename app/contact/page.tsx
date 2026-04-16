import type { Metadata } from 'next'
import ContactForm from './ContactForm'
import { Mail, Clock, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with SmartClaimAI — request a demo, ask about enterprise plans, or get technical support for wound care compliance.',
  openGraph: {
    title: 'Contact SmartClaimAI',
    description:
      'Get in touch with SmartClaimAI — request a demo, ask about enterprise plans, or get technical support.',
  },
}

const infoItems = [
  {
    icon: Mail,
    title: 'Email',
    detail: 'contact@smartclaimai.com',
    note: 'We typically respond within 1 business day.',
  },
  {
    icon: Clock,
    title: 'Response Time',
    detail: '< 24 hours',
    note: 'Monday – Friday, business hours.',
  },
  {
    icon: ShieldCheck,
    title: 'HIPAA-Safe',
    detail: 'Do not submit PHI',
    note: 'This form does not accept protected health information.',
  },
]

export default function ContactPage() {
  return (
    <main className="w-full bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">

        {/* Page header */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Have questions about SmartClaimAI? Want to request a demo for your wound care clinic
            or health system? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left: info cards */}
          <div className="space-y-6">
            {infoItems.map(({ icon: Icon, title, detail, note }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800"
              >
                <div
                  className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0"
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
                    {title}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{detail}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: contact form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}
