import './globals.css'
import type { Metadata } from 'next'
import ToasterClient from '@/components/ToasterClient'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import SessionWrapper from '@/components/SessionWrapper'
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
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
    googleBot: {
      index: true,
      follow: true,
    },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={jetbrainsMono.variable}>
      <body
        suppressHydrationWarning
        className={`${jetbrainsMono.className} bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col font-mono`}
      >
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
