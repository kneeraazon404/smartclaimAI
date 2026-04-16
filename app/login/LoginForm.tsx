'use client'

import { useState, Suspense } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Target, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react'

function LoginFormInner() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('from') || '/evaluate'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      })
      if (result?.error) {
        setError('Invalid email or password.')
      } else if (result?.url) {
        window.location.href = result.url
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="animate-fade-in-up w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-2xl border border-gray-100 dark:border-gray-800 p-8">

      <div className="flex flex-col items-center justify-center space-y-3 mb-8">
        <div className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-2xl flex items-center justify-center" aria-hidden="true">
          <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          Sign in to access the SmartClaimAI evaluation portal.
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900/30 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 pl-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="doctor@clinic.com"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border focus:border-emerald-500 dark:focus:border-emerald-500 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center pl-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <Link
              href="/forgot-password"
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 w-5 h-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border focus:border-emerald-500 dark:focus:border-emerald-500 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          ) : (
            <>Sign In <ArrowRight className="w-5 h-5" aria-hidden="true" /></>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800/60 text-center space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm"
          >
            Create one
          </Link>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          SmartClaimAI is currently in closed evaluation mode.
        </p>
      </div>
    </div>
  )
}

export default function LoginForm() {
  return (
    <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin text-emerald-600" aria-label="Loading" />}>
      <LoginFormInner />
    </Suspense>
  )
}
