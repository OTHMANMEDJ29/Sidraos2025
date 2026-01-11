// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL ERROR BOUNDARY
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const t = useTranslations('errors');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error('[GlobalError]', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
        <span className="text-2xl">⚠️</span>
      </div>
      <h2 className="text-xl font-semibold">{t('somethingWentWrong')}</h2>
      <p className="max-w-md text-center text-muted-foreground">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <Button onClick={reset}>{t('tryAgain')}</Button>
    </div>
  );
}
