// ═══════════════════════════════════════════════════════════════════════════════
// NAVBAR
// Floating glassmorphic navigation with RTL support & mobile menu
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/shared';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#features', labelKey: 'features' },
  { href: '/pricing', labelKey: 'pricing' },
] as const;

export function Navbar(): React.ReactElement {
  const t = useTranslations('nav');
  const tAuth = useTranslations('auth');
  const locale = useLocale();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLocale = (): void => {
    const newLocale = locale === 'ar' ? 'en' : 'ar';
    const currentPath = pathname.replace(/^\/(ar|en)/, '');
    window.location.href = `/${newLocale}${currentPath || '/'}`;
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 px-4 py-4 transition-all duration-500',
          isScrolled ? 'py-2' : 'py-4'
        )}
      >
        <nav
          className={cn(
            'mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500',
            isScrolled
              ? 'glass shadow-lg shadow-black/5 dark:shadow-black/20'
              : 'bg-transparent'
          )}
        >
          {/* Logo */}
          <Link href="/" className="group">
            <Logo size="sm" showText animated />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-xl"
            >
              {mounted && (
                <motion.div
                  key={theme}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </motion.div>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLocale}
              className="h-9 gap-1.5 rounded-xl px-3 text-sm font-medium"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === 'ar' ? 'EN' : 'ع'}</span>
            </Button>

            {/* Divider */}
            <div className="mx-2 h-6 w-px bg-border" />

            {/* Auth Buttons */}
            <Link href="/login">
              <Button variant="ghost" size="sm" className="h-9 rounded-xl px-4">
                {tAuth('login')}
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="h-9 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 text-white hover:from-emerald-600 hover:to-emerald-700"
              >
                {tAuth('register')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-xl"
            >
              {mounted && (theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              ))}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-9 w-9 rounded-xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? 'close' : 'open'}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                'absolute top-0 bottom-0 w-80 max-w-[85vw] bg-background p-6 shadow-2xl',
                locale === 'ar' ? 'start-0' : 'end-0'
              )}
            >
              <div className="flex h-full flex-col">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between pb-6">
                  <Logo size="sm" showText />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="h-9 w-9 rounded-xl"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex-1 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="block rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: locale === 'ar' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="pt-4"
                  >
                    <button
                      onClick={toggleLocale}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Globe className="h-5 w-5" />
                      {locale === 'ar' ? 'English' : 'العربية'}
                    </button>
                  </motion.div>
                </nav>

                {/* Mobile Auth Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-3 border-t pt-6"
                >
                  <Link href="/login" className="block">
                    <Button variant="outline" className="h-12 w-full rounded-xl">
                      {tAuth('login')}
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button className="h-12 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700">
                      {tAuth('register')}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
