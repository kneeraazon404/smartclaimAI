import type { Metadata } from 'next'
import RegisterForm from './RegisterForm'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a SmartClaimAI account to start evaluating wound care documentation against CMS Medicare LCD guidelines.',
  robots: { index: false, follow: false },
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-50 dark:from-emerald-900/20 via-white dark:via-gray-950 to-white dark:to-gray-950 -z-10" aria-hidden="true" />
      <RegisterForm />
    </main>
  )
}
