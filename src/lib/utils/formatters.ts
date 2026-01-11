// ═══════════════════════════════════════════════════════════════════════════════
// FORMATTING UTILITIES
// Locale-aware formatting for dates, currencies, and numbers
// ═══════════════════════════════════════════════════════════════════════════════

import type { Locale } from '@/i18n/config';

/**
 * Format a number as currency
 */
export function formatCurrency(
  amount: number,
  locale: Locale,
  currency?: string
): string {
  const currencyCode = currency || (locale === 'ar' ? 'SAR' : 'USD');

  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a number with locale-aware separators
 */
export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(
    locale === 'ar' ? 'ar-SA' : 'en-US',
    options
  ).format(value);
}

/**
 * Format a percentage
 */
export function formatPercentage(
  value: number,
  locale: Locale,
  decimals = 1
): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

/**
 * Format a date
 */
export function formatDate(
  date: Date | string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    dateStyle: 'long',
    ...options,
  }).format(dateObj);
}

/**
 * Format a date as relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(
  date: Date | string,
  locale: Locale
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale === 'ar' ? 'ar' : 'en', {
    numeric: 'auto',
  });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
  }
}

/**
 * Format a time
 */
export function formatTime(
  date: Date | string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    timeStyle: 'short',
    ...options,
  }).format(dateObj);
}

/**
 * Format a date and time together
 */
export function formatDateTime(
  date: Date | string,
  locale: Locale,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    ...options,
  }).format(dateObj);
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number, locale: Locale): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let size = bytes;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${formatNumber(size, locale, { maximumFractionDigits: 1 })} ${units[unitIndex]}`;
}
