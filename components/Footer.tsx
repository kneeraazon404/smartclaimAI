import Link from 'next/link'
import { BrandMark } from './BrandLogo'
import { ShieldCheck, ExternalLink } from 'lucide-react'

const productLinks = [
  { href: '/evaluate', label: 'Evaluate Documentation' },
  { href: '/about', label: 'About SmartClaimAI' },
  { href: '/faq', label: 'FAQ' },
]

const supportLinks = [{ href: '/contact', label: 'Contact Us' }]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg w-fit"
              aria-label="SmartClaimAI home"
            >
              <BrandMark className="w-7 h-7" />
              <span className="text-base font-bold text-gray-900 dark:text-white">
                <span className="text-emerald-600 dark:text-emerald-500">SmartClaim</span>AI
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              AI-powered wound care documentation compliance for healthcare providers. Built around
              CMS Medicare LCD L35041 guidelines.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
              Product
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Product links">
              {productLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
              Support
            </h3>
            <nav className="flex flex-col gap-3" aria-label="Support links">
              {supportLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Compliance column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">
              Compliance
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                HIPAA Data Practices
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" aria-hidden="true" />
                CMS LCD L35041
              </div>
              <a
                href="https://www.cms.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mt-1"
              >
                CMS.gov reference
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {year}{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">SmartClaimAI</span>.
            All rights reserved.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center sm:text-right">
            Clinical compliance tool — not a substitute for professional medical judgment.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
