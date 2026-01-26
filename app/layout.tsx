import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Layout } from '../components/Layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'After Inter | Universities & Scholarships',
  description: 'Verified education discovery platform for Telangana and Andhra Pradesh students.',
  metadataBase: new URL('https://afterinter.com'), // Replace with actual domain
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 transition-colors duration-200`}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}