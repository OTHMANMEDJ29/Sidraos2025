// ═══════════════════════════════════════════════════════════════════════════════
// 404 NOT FOUND PAGE
// ═══════════════════════════════════════════════════════════════════════════════

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('errors');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <div className="text-8xl font-bold text-muted-foreground/20">404</div>
      <h1 className="text-2xl font-semibold">{t('notFound')}</h1>
      <p className="max-w-md text-center text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="outline" className="gap-2">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t('tryAgain')}
        </Button>
      </Link>
    </div>
  );
}
