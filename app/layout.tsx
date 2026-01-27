import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '../components/ClientLayout';

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
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.afterinter.com',
    siteName: 'After Inter',
    title: 'After Inter | TS & AP Education Portal',
    description: 'Find top colleges, exams, and scholarships in Telangana and Andhra Pradesh. Verified data for students.',
    images: [
      {
        url: '/og-image.jpg', // Ensure you have an image at public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'After Inter Education Portal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'After Inter | TS & AP Education Guide',
    description: 'Admissions, Cutoffs, and Scholarships for TS/AP Students.',
    creator: '@afterinter',
  },
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "After Inter",
    "url": "https://www.afterinter.com",
    "logo": "https://www.afterinter.com/logo.png",
    "sameAs": [
      "https://facebook.com/afterinter",
      "https://twitter.com/afterinter"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-40-12345678",
      "contactType": "customer service",
      "areaServed": ["IN"],
      "availableLanguage": ["en", "te"]
    }
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-REPLACE_ME" crossOrigin="anonymous"></script>
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-100 transition-colors duration-200`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}