import './globals.css';
import { Metadata } from 'next';
import ToasterClient from '@/components/ToasterClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Wound Checklist Evaluation',
  description: 'Evaluate your wound checklist with AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ToasterClient />
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
