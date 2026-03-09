import './globals.css';
import { Metadata } from 'next';
import ToasterClient from '@/components/ToasterClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import SessionWrapper from "@/components/SessionWrapper";

export const metadata: Metadata = {
  title: 'SmartClaimAI',
  description: 'Evaluate your checklist with SmartClaimAI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning={true} className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        <SessionWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToasterClient />
            <Header />
              <div className="flex-1">
                {children}
              </div>
            <Footer />
          </ThemeProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
