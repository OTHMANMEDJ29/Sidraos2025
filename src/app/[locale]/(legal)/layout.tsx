import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import { Logo } from '@/components/shared';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LegalLayoutProps {
  children: React.ReactNode;
}

export default async function LegalLayout({ children }: LegalLayoutProps): Promise<React.ReactElement> {
  const locale = await getLocale();
  const isRTL = locale === 'ar';
  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-2 group">
              <BackIcon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              <Logo size="sm" showText={false} />
            </Link>
            <span className="text-sm text-muted-foreground">SidraOS</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-3xl mx-auto">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <Logo size="sm" />
            <p>© {new Date().getFullYear()} SidraOS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
