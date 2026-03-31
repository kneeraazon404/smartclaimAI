import type { Metadata } from 'next'
import ForgotPasswordForm from './ForgotPasswordForm'

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your SmartClaimAI account password.',
  robots: { index: false, follow: false },
}

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-50 dark:from-emerald-900/20 via-white dark:via-gray-950 to-white dark:to-gray-950 -z-10" aria-hidden="true" />
      <ForgotPasswordForm />
    </main>
  )
}
