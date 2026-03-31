import Link from 'next/link'
import { ArrowRight, CheckCircle, ShieldCheck, Zap } from 'lucide-react'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false })

export const metadata: Metadata = {
  title: {
    absolute: 'SmartClaimAI — AI-Powered Wound Care Compliance',
  },
  description:
    'Instantly evaluate wound care checklists against CMS Medicare LCD guidelines. AI-powered compliance analysis for wound care providers — secure, rapid, and accurate.',
  openGraph: {
    title: 'SmartClaimAI — AI-Powered Wound Care Compliance',
    description:
      'Instantly evaluate wound care checklists against CMS Medicare LCD guidelines. Secure, rapid, and accurate.',
  },
}

const features = [
  {
    icon: Zap,
    title: 'Instant AI Analysis',
    description:
      'Drop your clinical notes directly into our wizard. The AI engine processes the data within seconds, immediately flagging discrepancies or missing information.',
  },
  {
    icon: ShieldCheck,
    title: 'CMS Compliant',
    description:
      'Built strictly around CMS Medicare LCD Novitas guidelines for Skin Substitutes and CTPs. Ensure your documentation is watertight before submission.',
  },
  {
    icon: CheckCircle,
    title: 'Actionable Feedback',
    description:
      "Don't just get a pass or fail. Receive precise UI highlighting and clinical reasoning for exactly what requirement was missed.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-32 flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-50 dark:from-emerald-900/20 via-white dark:via-gray-950 to-white dark:to-gray-950 -z-10"
          aria-hidden="true"
        />

        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 max-w-4xl">
          Elevate Your Wound Care with{' '}
          <span className="text-emerald-600 dark:text-emerald-500">SmartClaimAI</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl leading-relaxed">
          Instantly evaluate wound checklists against the latest clinical standards and CMS Medicare
          LCD guidelines. Secure, rapid, and fiercely accurate.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/evaluate"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-md font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 active:bg-emerald-800 shadow-lg shadow-emerald-500/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Start an Evaluation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        aria-labelledby="features-heading"
        className="w-full py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose SmartClaimAI?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our platform is designed by clinicians and engineers to streamline the claim evaluation
              process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <div
                  className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChatWidget />
    </div>
  )
}
