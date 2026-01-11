// ═══════════════════════════════════════════════════════════════════════════════
// SITE CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════

export const siteConfig = {
  name: 'SidraOS',
  description: 'A Sovereign Life Operating System',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Localization
  defaultLocale: 'en' as const,
  locales: ['ar', 'en'] as const,
  
  // Theme
  defaultTheme: 'system' as const,
  
  // Features
  features: {
    productivity: true,
    finance: true,
    secondBrain: true,
  },
  
  // Branding
  branding: {
    primaryColor: '#0A0A0A',
    accentColor: '#C9A227',
    logo: '/logo.svg',
  },
  
  // Social links
  links: {
    twitter: 'https://twitter.com/sidraos',
    github: 'https://github.com/sidraos',
  },
} as const;

export type SiteConfig = typeof siteConfig;
