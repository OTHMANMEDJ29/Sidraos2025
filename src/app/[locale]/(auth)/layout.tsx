// ═══════════════════════════════════════════════════════════════════════════════
// AUTH LAYOUT
// Centered layout for authentication pages
// ═══════════════════════════════════════════════════════════════════════════════

import { Link } from '@/i18n/routing';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Minimal Header */}
      <header className="absolute inset-x-0 top-0 z-50 p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-bold">SidraOS</span>
        </Link>
      </header>

      {/* Centered Content */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Background Pattern */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -start-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/4 -end-1/4 h-1/2 w-1/2 rounded-full bg-gold/5 blur-3xl" />
      </div>
    </div>
  );
}
