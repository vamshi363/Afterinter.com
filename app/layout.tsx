import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#020617',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.afterinter.com'),
  title: {
    template: '%s | After Inter',
    default: 'After Inter | Telangana & AP Education, EAMCET, Scholarships',
  },
  description: 'The ultimate education discovery platform for Telangana & Andhra Pradesh students. Verify colleges, calculate EAMCET cutoffs, and find government scholarships (ePASS/JVD).',
  keywords: ['Telangana Universities', 'AP Colleges', 'EAMCET 2025', 'JVD Scholarship', 'ePASS Status', 'Engineering Counseling TS'],
  authors: [{ name: 'After Inter Team' }],
  creator: 'After Inter',
  publisher: 'After Inter',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          id="adsense-script"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-REPLACE_ME"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-100 transition-colors duration-200 flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}