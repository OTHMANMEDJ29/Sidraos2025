import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Scale } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal');
  return {
    title: t('termsOfService'),
    description: 'Terms of Service for SidraOS - Life Operating System',
  };
}

export default async function TermsPage(): Promise<React.ReactElement> {
  const t = await getTranslations('legal');

  const sections = [
    'acceptance',
    'description',
    'accounts',
    'payment',
    'conduct',
    'intellectual',
    'limitation',
    'changes',
  ] as const;

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      {/* Header */}
      <div className="not-prose mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-amber-500/10 mb-6">
          <Scale className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t('terms.title')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('lastUpdated', { date: 'January 11, 2026' })}
        </p>
      </div>

      {/* Introduction */}
      <div className="glass rounded-2xl p-6 mb-8 not-prose">
        <p className="text-muted-foreground leading-relaxed">
          {t('terms.intro')}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section} className="scroll-mt-20" id={section}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 text-sm font-bold">
                {sections.indexOf(section) + 1}
              </span>
              {t(`terms.sections.${section}.title`).replace(/^\d+\.\s*/, '')}
            </h2>
            <p className="text-muted-foreground leading-relaxed ps-11">
              {t(`terms.sections.${section}.content`)}
            </p>
          </section>
        ))}
      </div>

      {/* Contact */}
      <div className="not-prose mt-12 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-amber-500/5 border border-emerald-500/10">
        <p className="text-sm text-muted-foreground">
          Questions about these terms? Contact us at{' '}
          <a 
            href="mailto:legal@sidraos.com" 
            className="text-emerald-600 hover:text-emerald-500 font-medium"
          >
            legal@sidraos.com
          </a>
        </p>
      </div>
    </article>
  );
}
