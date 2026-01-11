// ═══════════════════════════════════════════════════════════════════════════════
// FONT OPTIMIZATION
// Using next/font for automatic font optimization, zero CLS
// ═══════════════════════════════════════════════════════════════════════════════

import { IBM_Plex_Sans_Arabic, Outfit, Playfair_Display } from 'next/font/google';

// Arabic Font - IBM Plex Sans Arabic
export const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-ibm-arabic',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// English Font - Outfit (modern geometric)
export const outfit = Outfit({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

// Display Font for Headlines - Playfair Display
export const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: false, // Only load when needed for headlines
  fallback: ['Georgia', 'serif'],
});
