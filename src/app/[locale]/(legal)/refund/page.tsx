import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { RefreshCcw } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal');
  return {
    title: t('refundPolicy'),
    description: 'Refund Policy for SidraOS - 14-day money-back guarantee',
  };
}

export default async function RefundPage(): Promise<React.ReactElement> {
  const t = await getTranslations('legal');

  const sections = [
    'eligibility',
    'process',
    'exceptions',
    'subscription',
    'contact',
  ] as const;

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      {/* Header */}
      <div className="not-prose mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 mb-6">
          <RefreshCcw className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t('refund.title')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('lastUpdated', { date: 'January 11, 2026' })}
        </p>
      </div>

      {/* Key Highlight */}
      <div className="not-prose mb-8 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
            <span className="text-2xl font-bold text-amber-600">14</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Day Money-Back Guarantee</h3>
            <p className="text-sm text-muted-foreground">
              Try SidraOS risk-free for 14 days. Not satisfied? Get a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="glass rounded-2xl p-6 mb-8 not-prose">
        <p className="text-muted-foreground leading-relaxed">
          {t('refund.intro')}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section} className="scroll-mt-20" id={section}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 text-sm font-bold">
                {sections.indexOf(section) + 1}
              </span>
              {t(`refund.sections.${section}.title`).replace(/^\d+\.\s*/, '')}
            </h2>
            <p className="text-muted-foreground leading-relaxed ps-11">
              {t(`refund.sections.${section}.content`)}
            </p>
          </section>
        ))}
      </div>

      {/* Contact */}
      <div className="not-prose mt-12 p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/10">
        <p className="text-sm text-muted-foreground">
          Need a refund? Contact our support team at{' '}
          <a 
            href="mailto:support@sidraos.com" 
            className="text-amber-600 hover:text-amber-500 font-medium"
          >
            support@sidraos.com
          </a>
        </p>
      </div>
    </article>
  );
}
