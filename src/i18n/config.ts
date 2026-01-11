// ═══════════════════════════════════════════════════════════════════════════════
// INTERNATIONALIZATION CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  ar: 'العربية',
  en: 'English',
};

export const localeDirections: Record<Locale, 'rtl' | 'ltr'> = {
  ar: 'rtl',
  en: 'ltr',
};

export function getDirection(locale: Locale): 'rtl' | 'ltr' {
  return localeDirections[locale];
}

export function isRTL(locale: Locale): boolean {
  return localeDirections[locale] === 'rtl';
}
