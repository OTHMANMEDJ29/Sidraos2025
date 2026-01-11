// ═══════════════════════════════════════════════════════════════════════════════
// LANDING PAGE
// Stunning public homepage with premium design & RTL support
// ═══════════════════════════════════════════════════════════════════════════════

import { setRequestLocale } from 'next-intl/server';
import { Navbar } from '@/components/layout';
import { Hero, Features, Pricing, Footer } from '@/components/landing';

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
