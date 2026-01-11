// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER
// Professional footer with legal links for Lemon Squeezy compliance
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Logo } from '@/components/shared';
import { Twitter, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/sidraos', label: 'Twitter' },
  { icon: Github, href: 'https://github.com/sidraos', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/company/sidraos', label: 'LinkedIn' },
];

export function Footer(): React.ReactElement {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: t('nav.features'), href: `/${locale}/#features` },
      { label: t('nav.pricing'), href: `/${locale}/pricing` },
      { label: t('footer.documentation'), href: `/${locale}/docs` },
      { label: t('footer.guides'), href: `/${locale}/guides` },
    ],
    company: [
      { label: t('nav.about'), href: `/${locale}/about` },
      { label: t('nav.blog'), href: `/${locale}/blog` },
      { label: t('nav.contact'), href: `/${locale}/contact` },
      { label: t('footer.community'), href: `/${locale}/community` },
    ],
    legal: [
      { label: t('legal.termsOfService'), href: '/legal/terms' },
      { label: t('legal.privacyPolicy'), href: '/legal/privacy' },
      { label: t('legal.refundPolicy'), href: '/legal/refund' },
    ],
    support: [
      { label: t('footer.support'), href: `/${locale}/support` },
      { label: 'FAQ', href: `/${locale}/faq` },
      { label: 'Status', href: 'https://status.sidraos.com' },
    ],
  };

  return (
    <footer className="relative border-t border-border/50 bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/5 to-muted/20 pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
            {/* Brand Column */}
            <div className="col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Logo size="lg" showText animated />
                <p className="mt-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
                  {locale === 'ar' 
                    ? 'نظام تشغيل حياتك الشخصي. منصة واحدة للإنتاجية والمالية والمعرفة.'
                    : 'Your personal life operating system. One platform for productivity, finance, and knowledge.'
                  }
                </p>

                {/* Social Links */}
                <div className="mt-6 flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-xl',
                          'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground',
                          'transition-colors duration-200'
                        )}
                        aria-label={social.label}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                    );
                  })}
                </div>

                {/* Newsletter */}
                <div className="mt-8">
                  <h4 className="text-sm font-semibold mb-3">
                    {locale === 'ar' ? 'اشترك في النشرة البريدية' : 'Subscribe to updates'}
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'your@email.com'}
                      className={cn(
                        'flex-1 h-10 px-4 rounded-xl text-sm',
                        'bg-muted/50 border border-border/50',
                        'placeholder:text-muted-foreground/50',
                        'focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent'
                      )}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'h-10 w-10 flex items-center justify-center rounded-xl',
                        'bg-emerald-500 hover:bg-emerald-600 text-white',
                        'transition-colors duration-200'
                      )}
                    >
                      <Mail className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Product Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h4 className="text-sm font-semibold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-sm font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Links - Critical for Lemon Squeezy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-sm font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h4 className="text-sm font-semibold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {currentYear} SidraOS. {t('common.allRightsReserved')}.
            </p>

            {/* Status & Made with love */}
            <div className="flex items-center gap-6">
              {/* Status Indicator */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-2 w-2 rounded-full bg-emerald-500"
                />
                <span>{t('common.systemOperational')}</span>
              </div>

              {/* Made with love */}
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                {locale === 'ar' ? 'صُنع بـ' : 'Made with'}
                <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                {locale === 'ar' ? 'للمسلمين' : 'for Muslims'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
