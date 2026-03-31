import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about SmartClaimAI — HIPAA compliance, LCD guidelines covered, EMR integration, and more.',
  openGraph: {
    title: 'FAQ — SmartClaimAI',
    description:
      'Frequently asked questions about SmartClaimAI — HIPAA compliance, LCD guidelines covered, EMR integration, and more.',
  },
}

const faqs = [
  {
    question: 'Is this system HIPAA compliant?',
    answer:
      'Yes. SmartClaimAI is designed to process clinical data securely. We do not store protected health information (PHI) longer than necessary to perform the evaluation, and all data inflight and at rest is encrypted using industry-standard protocols.',
  },
  {
    question: 'Which LCD guidelines does this cover?',
    answer:
      'Currently, our engine is tuned to the stringent requirements of CMS Medicare LCD L35041 (Application of Skin Substitute Grafts for Treatment of DFU and VLU of Lower Extremities) and its associated billing articles.',
  },
  {
    question: 'Can I use this for non-Medicare patients?',
    answer:
      'Absolutely. While the rules are based on Medicare LCDs (which represent the gold standard for clinical documentation requirements), ensuring this level of detail usually guarantees coverage from commercial payers as well.',
  },
  {
    question: 'Does this replace my EMR?',
    answer:
      'No. Think of SmartClaimAI as an intelligent preamble or a final check before you lock your clinical note in your EMR. It ensures your narrative meets all criteria before you bill the claim.',
  },
  {
    question: 'What if the AI flags something incorrectly?',
    answer:
      'Our engine is deterministic and based on boolean logic tied directly to published guidelines. However, clinical judgment always supersedes the tool. If you believe a flag is incorrect in your specific clinical scenario, you can proceed, though we recommend reviewing the specific LCD guideline cited by the warning.',
  },
]

export default function FAQPage() {
  return (
    <main className="w-full flex-1 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">

        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about integrating SmartClaimAI into your wound care clinic.
          </p>
        </div>

        <div className="space-y-6 mb-20">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none p-6 font-semibold text-lg text-gray-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset">
                <span>{faq.question}</span>
                <ChevronDown
                  className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180 flex-shrink-0 ml-4"
                  aria-hidden="true"
                />
              </summary>
              <div className="text-gray-600 dark:text-gray-300 p-6 pt-0 leading-relaxed border-t border-gray-100 dark:border-gray-800 mt-2">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Still have questions? Let&apos;s put it to the test.
          </p>
          <Link
            href="/evaluate"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Start Evaluating
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </main>
  )
}
