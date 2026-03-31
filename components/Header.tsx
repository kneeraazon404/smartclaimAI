'use client'

import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { useSession, signOut } from 'next-auth/react'
import { UserCircle2, LogOut, LogIn, Settings } from 'lucide-react'

const navLinks = [
  { href: '/evaluate', label: 'Evaluate' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
]

const Header = () => {
  const { data: session, status } = useSession()

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm"
          aria-label="SmartClaimAI — home"
        >
          <span className="text-emerald-600 dark:text-emerald-500">SmartClaim</span>AI
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side: auth + theme */}
        <div className="flex items-center gap-3">
          {status === 'loading' ? (
            <div className="h-9 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse hidden sm:block" aria-hidden="true" />
          ) : session ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full font-medium shadow-sm border border-emerald-100 dark:border-emerald-800 text-sm">
                <UserCircle2 className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span className="max-w-[120px] truncate">{session.user?.name || session.user?.email}</span>
              </div>
              <Link
                href="/settings"
                className="p-2 text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm"
                aria-label="Account settings"
              >
                <Settings className="w-5 h-5" aria-hidden="true" />
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-sm"
                aria-label="Sign out"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <LogIn className="w-4 h-4" aria-hidden="true" />
              Sign In
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile nav */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden w-full overflow-x-auto border-t dark:border-gray-800 px-6 py-3 flex items-center gap-6"
      >
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm"
          >
            {label}
          </Link>
        ))}
        {session && (
          <Link
            href="/settings"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-sm"
          >
            Settings
          </Link>
        )}
      </nav>
    </header>
  )
}

export default Header
