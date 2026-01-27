import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '../components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'After Inter | Universities, Exams & Scholarships for TS & AP',
  description: 'The ultimate guide for AP & TS students. Find verified info on universities, EAMCET counseling, scholarships (ePASS/JVD), and entrance exams.',
  keywords: 'Telangana Universities, AP Colleges, EAMCET 2025, Scholarships, Engineering Colleges Hyderabad, Inter results',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "After Inter",
              "url": "https://www.afterinter.com",
              "description": "Education discovery platform for Telangana and Andhra Pradesh students.",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "support@afterinter.com"
              }
            })
          }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-REPLACE_ME" crossOrigin="anonymous"></script>
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-100 transition-colors duration-200`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}