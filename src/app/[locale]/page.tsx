// ═══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE
// Stunning public homepage with premium design & RTL support
// ═══════════════════════════════════════════════════════════════════════════════

import { setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/layout';
import { Hero, Footer } from '@/components/landing';

// Lazy load heavy sections for better FCP
const Features = dynamic(() => import('@/components/landing').then(mod => ({ default: mod.Features })), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-muted/20" />,
});

const Pricing = dynamic(() => import('@/components/landing').then(mod => ({ default: mod.Pricing })), {
  loading: () => <div className="min-h-[600px] animate-pulse bg-muted/20" />,
});

interface LandingPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
