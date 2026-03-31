import type { Metadata } from 'next'
import SettingsForm from './SettingsForm'

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your SmartClaimAI account settings.',
  robots: { index: false, follow: false },
}

export default function SettingsPage() {
  return (
    <main className="w-full py-8 md:py-12 bg-gray-50/50 dark:bg-black/50 transition-colors duration-300 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Account Settings
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your profile and security settings.
          </p>
        </div>
        <SettingsForm />
      </div>
    </main>
  )
}
