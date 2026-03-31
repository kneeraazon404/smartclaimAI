'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Target, Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function RegisterForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Registration failed.')
        return
      }

      setSuccess(data.message)
      setTimeout(() => router.push('/login'), 3000)
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl dark:shadow-2xl border border-gray-100 dark:border-gray-800 p-8"
    >
      <div className="flex flex-col items-center space-y-3 mb-8">
        <div className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-2xl" aria-hidden="true">
          <Target className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create an Account</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
          Join SmartClaimAI to start evaluating wound care documentation.
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900/30 text-center">
          {error}
        </div>
      )}

      {success && (
        <div role="status" className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-sm rounded-xl border border-emerald-100 dark:border-emerald-900/30 text-center">
          {success} Redirecting to login…
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300 pl-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              placeholder="Dr. Jane Smith"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300 pl-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="doctor@clinic.com"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300 pl-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              minLength={8}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 dark:text-gray-300 pl-1">Confirm Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 w-5 h-5 text-gray-400" aria-hidden="true" />
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              placeholder="Repeat your password"
              className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-gray-400 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !!success}
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
          ) : (
            <>Create Account <ArrowRight className="w-5 h-5" aria-hidden="true" /></>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm">
          Sign in
        </Link>
      </p>
    </motion.div>
  )
}
