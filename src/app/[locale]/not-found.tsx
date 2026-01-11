// ═══════════════════════════════════════════════════════════════════════════════
// 404 NOT FOUND PAGE
// A beautiful, animated 404 page with Islamic geometric patterns
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Home, Search, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/shared';

// Islamic geometric pattern SVG component
function GeometricPattern(): React.ReactElement {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.03] dark:opacity-[0.05]"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M10 0L20 10L10 20L0 10Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
          />
          <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="0.3" />
          <path
            d="M5 5L15 5L15 15L5 15Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            transform="rotate(45 10 10)"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
    </svg>
  );
}

// Floating orbs animation
function FloatingOrbs(): React.ReactElement {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-20 -start-20 h-96 w-96 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-20 -end-20 h-80 w-80 rounded-full bg-gradient-to-br from-amber-500/10 to-transparent blur-3xl"
      />
    </div>
  );
}

// Animated numbers component
function AnimatedNumber({ digit, delay }: { digit: string; delay: number }): React.ReactElement {
  return (
    <motion.span
      initial={{ opacity: 0, y: 50, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: 'spring',
        stiffness: 100,
      }}
      className="inline-block"
    >
      <motion.span
        animate={{ 
          textShadow: [
            '0 0 20px rgba(16, 185, 129, 0)',
            '0 0 40px rgba(16, 185, 129, 0.3)',
            '0 0 20px rgba(16, 185, 129, 0)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="bg-gradient-to-br from-emerald-400 via-emerald-500 to-amber-500 bg-clip-text text-transparent"
      >
        {digit}
      </motion.span>
    </motion.span>
  );
}

export default function NotFound(): React.ReactElement {
  const t = useTranslations('errors');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const suggestions = [
    { 
      href: '/', 
      icon: Home, 
      labelEn: 'Go to Homepage', 
      labelAr: 'الذهاب للصفحة الرئيسية',
      descEn: 'Start fresh from the beginning',
      descAr: 'ابدأ من جديد',
    },
    { 
      href: '/pricing', 
      icon: Search, 
      labelEn: 'View Pricing', 
      labelAr: 'عرض الأسعار',
      descEn: 'Explore our plans',
      descAr: 'استكشف خططنا',
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-8">
      {/* Background Elements */}
      <GeometricPattern />
      <FloatingOrbs />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Logo size="lg" showText={false} animated />
        </motion.div>

        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[180px] font-bold leading-none tracking-tighter">
            <AnimatedNumber digit="4" delay={0.2} />
            <AnimatedNumber digit="0" delay={0.4} />
            <AnimatedNumber digit="4" delay={0.6} />
          </h1>
          
          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="absolute -bottom-2 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500"
          />
        </div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mb-4 text-2xl font-semibold sm:text-3xl"
        >
          {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mb-12 max-w-md text-muted-foreground"
        >
          {isRTL 
            ? 'يبدو أن هذه الصفحة قد ضلت طريقها. لا تقلق، دعنا نساعدك في العودة إلى المسار الصحيح.'
            : "Looks like this page has lost its way. Don't worry, let's help you get back on track."
          }
        </motion.p>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <Link key={suggestion.href} href={suggestion.href}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm transition-colors hover:border-emerald-500/30 hover:bg-card"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-amber-500/10 transition-colors group-hover:from-emerald-500/20 group-hover:to-amber-500/20">
                    <Icon className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div className="text-start">
                    <p className="font-medium">
                      {isRTL ? suggestion.labelAr : suggestion.labelEn}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? suggestion.descAr : suggestion.descEn}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </motion.div>
              </Link>
            );
          })}
        </motion.div>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            {isRTL ? '← العودة للصفحة السابقة' : '← Go back to previous page'}
          </Button>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 text-sm text-muted-foreground/50"
      >
        SidraOS • {isRTL ? 'حياتك، منظّمة' : 'Your Life, Orchestrated'}
      </motion.div>
    </div>
  );
}
