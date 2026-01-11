// ═══════════════════════════════════════════════════════════════════════════════
// LOCALE LAYOUT
// Root layout for all localized pages with RTL/LTR support & theme
// ═══════════════════════════════════════════════════════════════════════════════

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getDirection, type Locale } from '@/i18n/config';
import { ThemeProvider } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  // Determine text direction
  const direction = getDirection(locale as Locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <NextIntlClientProvider messages={messages}>
            {children}
            <Toaster position={direction === 'rtl' ? 'top-left' : 'top-right'} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
