import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About | SmartClaimAI',
  description: 'Learn about SmartClaimAI and how we ensure flawless wound care claims against Medicare LCD guidelines.',
}

export default function AboutPage() {
  return (
    <main className="w-full flex-1 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">
          About <span className="text-emerald-600 dark:text-emerald-500">SmartClaimAI</span>
        </h1>

        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed mb-16 space-y-6">
          <p>
            At SmartClaimAI, we understand that meticulous documentation is the cornerstone of sustainable wound care practices. The landscape of Medicare compliance, particularly regarding Skin Substitutes and Cellular and/or Tissue-Based Products (CTPs), is stringent and unforgiving. 
          </p>
          <p>
            Our intelligent clinical assistant was engineered to bridge the gap between clinical care and administrative perfection. By analyzing your clinical notes directly against the latest <strong>CMS Medicare Local Coverage Determination (LCD) L35041</strong> and related articles, we instantly identify omissions that would otherwise result in costly claim denials.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">Our Mission</h2>
          <p>
            To empower healthcare providers to focus on healing patients, not fighting denials. We aim to guarantee that every legitimate application of advanced wound care therapies is robustly supported by immaculate, instantly verified documentation.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-4">How It Works</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Input:</strong> Providers traverse our streamlined wizard, entering data regarding the wound&apos;s etiology, conservative treatments failed, and specific CTP applications.</li>
            <li><strong>Analyze:</strong> Our inference engine cross-references the inputs against strict Medicare parameters (e.g., wound duration &gt; 4 weeks, failed 4 weeks of standard care, clear documentation of size evolution).</li>
            <li><strong>Alert:</strong> Instant, actionable feedback highlights exact areas of non-compliance before the note is locked and the claim is billed.</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Stop Leaving Revenue on the Table</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">
            Experience the confidence of zero-denial documentation workflows. 
          </p>
          <Link 
            href="/evaluate"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20"
          >
            Try SmartClaimAI Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </main>
  )
}
