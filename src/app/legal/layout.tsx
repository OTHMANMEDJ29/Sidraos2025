// ═══════════════════════════════════════════════════════════════════════════════
// LEGAL PAGES LAYOUT
// Clean, minimal, distraction-free design for legal documents
// ═══════════════════════════════════════════════════════════════════════════════

import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | SidraOS Legal',
    default: 'Legal | SidraOS',
  },
};

interface LegalLayoutProps {
  children: React.ReactNode;
}

export default function LegalLayout({ children }: LegalLayoutProps): React.ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Simple Header */}
      <header className="border-b border-neutral-100">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 text-neutral-900 transition-opacity hover:opacity-70"
          >
            {/* Simple Logo Mark */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">SidraOS</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-12 sm:py-16 lg:py-20">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-neutral-100 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
            <p className="text-sm text-neutral-500">
              © {currentYear} SidraOS. All rights reserved.
            </p>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link 
                href="/legal/terms" 
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Terms of Service
              </Link>
              <Link 
                href="/legal/privacy" 
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/legal/refund" 
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Refund Policy
              </Link>
              <Link 
                href="/" 
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                ← Back to Home
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
