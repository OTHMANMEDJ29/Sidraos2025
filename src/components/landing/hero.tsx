// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// Stunning hero with floating geometric elements, Logo & Waitlist with confetti
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, type Variants } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// Custom cubic bezier easing for smooth animations
const customEase = [0.22, 1, 0.36, 1] as const;
import { Logo } from '@/components/shared';
import { WaitlistForm } from './waitlist-form';

// Floating geometric shapes for the background
function FloatingShapes(): React.ReactElement {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden will-change-transform">
      {/* Large gradient orb - top right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute -end-32 -top-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 via-emerald-500/5 to-transparent blur-3xl"
        style={{ willChange: 'transform, opacity' }}
      />
      
      {/* Accent orb - bottom left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
        className="absolute -bottom-48 -start-48 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-amber-500/15 via-amber-500/5 to-transparent blur-3xl"
      />

      {/* Gold orb - center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-gold/5 to-transparent blur-3xl"
      />

      {/* Floating geometric elements - optimized with will-change */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute end-[15%] top-[20%] h-24 w-24"
        style={{ willChange: 'transform' }}
      >
        <div className="h-full w-full rotate-45 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute start-[10%] top-[35%] h-16 w-16"
        style={{ willChange: 'transform' }}
      >
        <div className="h-full w-full rounded-full border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-transparent" />
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, -25, 0],
          x: [0, 15, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-[20%] end-[25%] h-20 w-20"
        style={{ willChange: 'transform' }}
      >
        <div className="flex h-full w-full items-center justify-center rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/5 to-transparent backdrop-blur-sm">
          <Sparkles className="h-8 w-8 text-gold/40" />
        </div>
      </motion.div>

      {/* Additional floating element - Tree like */}
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute start-[20%] bottom-[30%] h-12 w-12"
        style={{ willChange: 'transform' }}
      >
        <div className="h-full w-full rounded-xl border border-emerald-500/30 bg-gradient-to-t from-emerald-500/10 to-transparent" />
      </motion.div>

      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 pattern-islamic opacity-30" />
    </div>
  );
}

// Animated text reveal
const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.8,
      ease: customEase,
    },
  }),
};

export function Hero(): React.ReactElement {
  const t = useTranslations('landing.hero');
  const locale = useLocale();

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      <FloatingShapes />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo - Animated Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="mb-8 flex justify-center"
          >
            <Logo size="xl" showText animated />
          </motion.div>

          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>{locale === 'ar' ? 'نظام تشغيل حياتك الشخصي' : 'Your Personal Life Operating System'}</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">{t('title').split(' ').slice(0, -1).join(' ')}</span>
            <span className="mt-2 block bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 bg-clip-text text-transparent">
              {t('title').split(' ').slice(-1)[0]}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          {/* Waitlist Form */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-12 flex justify-center"
          >
            <WaitlistForm />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-emerald-400/60 to-emerald-600/30"
                  />
                ))}
              </div>
              <span>{locale === 'ar' ? '+2000 في قائمة الانتظار' : '2000+ on waitlist'}</span>
            </div>
            <div className="hidden h-4 w-px bg-border sm:block" />
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-amber-500 text-amber-500"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span>{locale === 'ar' ? 'تقييم 4.9/5' : '4.9/5 Rating'}</span>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview - Floating Card */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, ease: customEase }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          {/* Glow effect behind card */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-amber-500/10 to-emerald-500/20 blur-3xl" />
          
          {/* Dashboard Preview Card */}
          <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-2 shadow-2xl backdrop-blur-sm">
            <div className="overflow-hidden rounded-2xl border border-border/30 bg-background">
              {/* Fake browser header */}
              <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                  <div className="h-3 w-3 rounded-full bg-green-400/60" />
                </div>
                <div className="mx-auto rounded-lg bg-background/50 px-4 py-1 text-xs text-muted-foreground">
                  app.sidraos.com
                </div>
              </div>
              
              {/* Dashboard Content Placeholder - More realistic */}
              <div className="aspect-[16/9] bg-gradient-to-br from-background via-background to-muted/20 p-6">
                <div className="grid h-full grid-cols-12 gap-4">
                  {/* Sidebar placeholder */}
                  <div className="col-span-3 space-y-3 rounded-xl bg-muted/30 p-4">
                    {/* Logo placeholder */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500/30 to-amber-500/30" />
                      <div className="h-4 w-16 rounded bg-muted/50" />
                    </div>
                    <div className="space-y-2 pt-4">
                      {[85, 70, 90, 75, 80].map((width, i) => (
                        <div 
                          key={i} 
                          className={`h-8 rounded-lg ${i === 0 ? 'bg-emerald-500/20' : 'bg-muted/40'}`} 
                          style={{ width: `${width}%` }} 
                        />
                      ))}
                    </div>
                  </div>
                  {/* Main content placeholder */}
                  <div className="col-span-9 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-48 rounded-lg bg-muted/40" />
                      <div className="h-8 w-24 rounded-lg bg-emerald-500/20" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div 
                          key={i} 
                          className="aspect-[4/3] rounded-xl bg-gradient-to-br from-muted/40 to-muted/20 p-4"
                        >
                          <div className="h-3 w-16 rounded bg-muted/50 mb-2" />
                          <div className="h-6 w-20 rounded bg-muted/40" />
                        </div>
                      ))}
                    </div>
                    <div className="h-32 rounded-xl bg-muted/30 p-4">
                      <div className="h-full w-full rounded-lg bg-gradient-to-r from-emerald-500/10 via-transparent to-amber-500/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
