// ═══════════════════════════════════════════════════════════════════════════════
// FEATURES SECTION
// Elegant feature cards with staggered scroll animations
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView, type Variants } from 'framer-motion';
import { 
  CheckSquare, 
  Wallet, 
  Brain,
  Calendar,
  Target,
  PieChart,
  FileText,
  Bookmark,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Custom cubic bezier easing
const customEase = [0.22, 1, 0.36, 1] as const;

const features = [
  {
    id: 'productivity',
    icon: CheckSquare,
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-500',
    borderColor: 'border-emerald-500/20',
    subFeatures: [
      { icon: CheckSquare, labelEn: 'Smart Tasks', labelAr: 'مهام ذكية' },
      { icon: Calendar, labelEn: 'Calendar', labelAr: 'التقويم' },
      { icon: Target, labelEn: 'Habit Tracking', labelAr: 'تتبع العادات' },
    ],
  },
  {
    id: 'finance',
    icon: Wallet,
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-500',
    borderColor: 'border-amber-500/20',
    subFeatures: [
      { icon: Wallet, labelEn: 'Transactions', labelAr: 'المعاملات' },
      { icon: PieChart, labelEn: 'Budgets', labelAr: 'الميزانيات' },
      { icon: Sparkles, labelEn: 'Insights', labelAr: 'الرؤى' },
    ],
  },
  {
    id: 'secondBrain',
    icon: Brain,
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconColor: 'text-violet-500',
    borderColor: 'border-violet-500/20',
    subFeatures: [
      { icon: FileText, labelEn: 'Notes', labelAr: 'الملاحظات' },
      { icon: Bookmark, labelEn: 'Bookmarks', labelAr: 'الإشارات' },
      { icon: Brain, labelEn: 'Journal', labelAr: 'اليومية' },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: customEase,
    },
  },
};

function FeatureCard({
  feature,
  index,
}: {
  feature: typeof features[0];
  index: number;
}) {
  const t = useTranslations('landing.features');
  const locale = useLocale();
  const Icon = feature.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
      style={{ willChange: 'transform' }}
    >
      {/* Card */}
      <div
        className={cn(
          'relative overflow-hidden rounded-3xl border bg-card p-8 transition-all duration-500',
          'hover:border-transparent hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/20',
          feature.borderColor
        )}
      >
        {/* Gradient Background on Hover */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100',
            feature.gradient
          )}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={cn(
              'mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br',
              feature.gradient
            )}
          >
            <Icon className={cn('h-7 w-7', feature.iconColor)} />
          </motion.div>

          {/* Title */}
          <h3 className="mb-3 text-xl font-semibold tracking-tight">
            {t(`${feature.id}.title`)}
          </h3>

          {/* Description */}
          <p className="mb-6 leading-relaxed text-muted-foreground">
            {t(`${feature.id}.description`)}
          </p>

          {/* Sub-features */}
          <div className="space-y-3">
            {feature.subFeatures.map((sub, i) => {
              const SubIcon = sub.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: locale === 'ar' ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50">
                    <SubIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">
                    {locale === 'ar' ? sub.labelAr : sub.labelEn}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Learn More Link */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-6 pt-6 border-t border-border/50"
          >
            <button className="group/btn flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {locale === 'ar' ? 'اكتشف المزيد' : 'Learn more'}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100" />
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function Features() {
  const t = useTranslations('landing.features');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="features" className="relative py-24 md:py-32" ref={ref}>
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 pattern-islamic opacity-30" />
        <div className="absolute start-0 top-1/4 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute end-0 bottom-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: customEase }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-4 inline-block rounded-full bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold"
          >
            {locale === 'ar' ? 'المميزات' : 'Features'}
          </motion.span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {locale === 'ar' 
              ? 'كل ما تحتاجه لتنظيم حياتك في مكان واحد'
              : 'Everything you need to organize your life in one place'
            }
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            {locale === 'ar' 
              ? 'وأكثر من ذلك بكثير... اكتشف كيف يمكن لـ SidraOS تغيير طريقة عملك'
              : 'And much more... Discover how SidraOS can transform the way you work'
            }
          </p>
        </motion.div>
      </div>
    </section>
  );
}
