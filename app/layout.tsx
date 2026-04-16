import './globals.css'
import type { Metadata } from 'next'
import ToasterClient from '@/components/ToasterClient'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import SessionWrapper from '@/components/SessionWrapper'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://smartclaimai.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SmartClaimAI — AI-Powered Wound Care Compliance',
    template: '%s | SmartClaimAI',
  },
  description:
    'Instantly evaluate wound care checklists against CMS Medicare LCD guidelines. AI-powered compliance analysis for healthcare providers — secure, rapid, and accurate.',
  keywords: [
    'wound care',
    'CMS compliance',
    'Medicare LCD',
    'clinical documentation',
    'AI evaluation',
    'skin substitutes',
    'CTP guidelines',
    'healthcare AI',
    'claim denial prevention',
    'wound care checklist',
  ],
  authors: [{ name: 'SmartClaimAI' }],
  creator: 'SmartClaimAI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'SmartClaimAI',
    title: 'SmartClaimAI — AI-Powered Wound Care Compliance',
    description:
      'Instantly evaluate wound care checklists against CMS Medicare LCD guidelines. Secure, rapid, and accurate.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartClaimAI — AI-Powered Wound Care Compliance',
    description:
      'Instantly evaluate wound care checklists against CMS Medicare LCD guidelines. Secure, rapid, and accurate.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SmartClaimAI',
  applicationCategory: 'MedicalApplication',
  operatingSystem: 'Web',
  url: siteUrl,
  description:
    'AI-powered wound care compliance tool that evaluates clinical documentation against CMS Medicare LCD L35041 guidelines.',
  provider: {
    '@type': 'Organization',
    name: 'SmartClaimAI',
    url: siteUrl,
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="font-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SessionWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterClient />
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}
