"use client"

import Link from 'next/link'
import { ThemeToggle } from "./ThemeToggle"
import { useSession, signOut } from "next-auth/react"
import { UserCircle2, LogOut, LogIn } from "lucide-react"

const Header = () => {
    const { data: session, status } = useSession()
    return (
        <header className="w-full bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:opacity-90 transition-opacity">
                    <span className="text-emerald-600 dark:text-emerald-500">SmartClaim</span>AI
                </Link>

                {/* desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/evaluate" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        Evaluate
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        About
                    </Link>
                    <Link href="/faq" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                        FAQ
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    {status === "loading" ? (
                        <div className="h-9 w-24 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse hidden sm:block"></div>
                    ) : session ? (
                        <div className="hidden sm:flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full font-medium shadow-sm border border-emerald-100 dark:border-emerald-800 text-sm">
                                <UserCircle2 className="w-4 h-4" />
                                <span className="max-w-[120px] truncate">{session.user?.name || session.user?.email}</span>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                title="Sign out"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-full text-sm font-medium transition-colors"
                        >
                            <LogIn className="w-4 h-4" />
                            Sign In
                        </Link>
                    )}
                    <ThemeToggle />
                </div>
            </div>
            
            {/* mobile nav (simple horizontal scroll) */}
            <div className="md:hidden w-full overflow-x-auto border-t dark:border-gray-800 px-6 py-3 flex items-center gap-6">
                 <Link href="/evaluate" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors whitespace-nowrap">
                    Evaluate
                </Link>
                <Link href="/about" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors whitespace-nowrap">
                    About
                </Link>
                <Link href="/faq" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 transition-colors whitespace-nowrap">
                    FAQ
                </Link>
            </div>
        </header>
    )
}

export default Header
