import type { Metadata } from 'next'
import { ChecklistWizard } from '@/features/checklist/ChecklistWizard'

export const metadata: Metadata = {
  title: 'Evaluate',
  description:
    'Complete the wound care checklist wizard. AI evaluates your clinical data against CMS Medicare LCD guidelines in seconds.',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <main className="w-full py-8 md:py-12 bg-gray-50/50 dark:bg-black/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            SmartClaimAI Evaluation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Please fill out the multi-step form accurately based on clinical notes. The AI will
            evaluate the data against latest standards of care.
          </p>
        </div>

        <ChecklistWizard />
      </div>
    </main>
  )
}
