import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Shield } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('legal');
  return {
    title: t('privacyPolicy'),
    description: 'Privacy Policy for SidraOS - How we protect your data',
  };
}

export default async function PrivacyPage(): Promise<React.ReactElement> {
  const t = await getTranslations('legal');

  const sections = [
    'collection',
    'use',
    'sharing',
    'security',
    'retention',
    'rights',
    'cookies',
    'contact',
  ] as const;

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      {/* Header */}
      <div className="not-prose mb-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-6">
          <Shield className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {t('privacy.title')}
        </h1>
        <p className="text-lg text-muted-foreground">
          {t('lastUpdated', { date: 'January 11, 2026' })}
        </p>
      </div>

      {/* Introduction */}
      <div className="glass rounded-2xl p-6 mb-8 not-prose">
        <p className="text-muted-foreground leading-relaxed">
          {t('privacy.intro')}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section} className="scroll-mt-20" id={section}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 text-sm font-bold">
                {sections.indexOf(section) + 1}
              </span>
              {t(`privacy.sections.${section}.title`).replace(/^\d+\.\s*/, '')}
            </h2>
            <p className="text-muted-foreground leading-relaxed ps-11">
              {t(`privacy.sections.${section}.content`)}
            </p>
          </section>
        ))}
      </div>

      {/* Contact */}
      <div className="not-prose mt-12 p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/10">
        <p className="text-sm text-muted-foreground">
          Questions about privacy? Contact our DPO at{' '}
          <a 
            href="mailto:privacy@sidraos.com" 
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            privacy@sidraos.com
          </a>
        </p>
      </div>
    </article>
  );
}
