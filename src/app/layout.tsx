// ═══════════════════════════════════════════════════════════════════════════════
// ROOT LAYOUT
// This layout wraps all pages and provides fonts
// The actual html/body tags are in [locale]/layout.tsx for proper i18n support
// ═══════════════════════════════════════════════════════════════════════════════

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'SidraOS - Your Life, Orchestrated',
    template: '%s | SidraOS',
  },
  description: 'A sovereign Life Operating System for productivity, finance, and knowledge management.',
  keywords: ['productivity', 'finance', 'notes', 'tasks', 'calendar', 'habits', 'budgets'],
  authors: [{ name: 'SidraOS Team' }],
  creator: 'SidraOS',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    url: '/',
    siteName: 'SidraOS',
    title: 'SidraOS - Your Life, Orchestrated',
    description: 'A sovereign Life Operating System for productivity, finance, and knowledge management.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SidraOS - Your Life, Orchestrated',
    description: 'A sovereign Life Operating System for productivity, finance, and knowledge management.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
