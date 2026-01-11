// ═══════════════════════════════════════════════════════════════════════════════
// PRICING SECTION
// Elegant pricing cards with premium design
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useRef } from 'react';
import { useLocale } from 'next-intl';
import { motion, useInView, type Variants } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';

// Custom cubic bezier easing for smooth animations
const customEase = [0.22, 1, 0.36, 1] as const;
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'free',
    nameEn: 'Free',
    nameAr: 'مجاني',
    priceEn: '$0',
    priceAr: '٠ $',
    periodEn: '/month',
    periodAr: '/شهر',
    descriptionEn: 'Perfect for getting started',
    descriptionAr: 'مثالي للبدء',
    features: [
      { en: 'Up to 100 tasks', ar: 'حتى ١٠٠ مهمة' },
      { en: 'Basic finance tracking', ar: 'تتبع مالي أساسي' },
      { en: '50 notes', ar: '٥٠ ملاحظة' },
      { en: 'Community support', ar: 'دعم المجتمع' },
    ],
    cta: { en: 'Get Started', ar: 'ابدأ الآن' },
    popular: false,
  },
  {
    id: 'pro',
    nameEn: 'Pro',
    nameAr: 'احترافي',
    priceEn: '$12',
    priceAr: '١٢ $',
    periodEn: '/month',
    periodAr: '/شهر',
    descriptionEn: 'For serious productivity',
    descriptionAr: 'للإنتاجية الجادة',
    features: [
      { en: 'Unlimited tasks', ar: 'مهام غير محدودة' },
      { en: 'Advanced analytics', ar: 'تحليلات متقدمة' },
      { en: 'Unlimited notes', ar: 'ملاحظات غير محدودة' },
      { en: 'API access', ar: 'الوصول للـ API' },
      { en: 'Priority support', ar: 'دعم ذو أولوية' },
      { en: 'Custom categories', ar: 'فئات مخصصة' },
    ],
    cta: { en: 'Start Free Trial', ar: 'ابدأ التجربة المجانية' },
    popular: true,
  },
  {
    id: 'enterprise',
    nameEn: 'Enterprise',
    nameAr: 'مؤسسي',
    priceEn: 'Custom',
    priceAr: 'مخصص',
    periodEn: '',
    periodAr: '',
    descriptionEn: 'For teams & organizations',
    descriptionAr: 'للفرق والمؤسسات',
    features: [
      { en: 'Everything in Pro', ar: 'كل ميزات الاحترافي' },
      { en: 'Team collaboration', ar: 'تعاون الفريق' },
      { en: 'SSO & SAML', ar: 'SSO و SAML' },
      { en: 'Dedicated support', ar: 'دعم مخصص' },
      { en: 'Custom integrations', ar: 'تكاملات مخصصة' },
      { en: 'SLA guarantee', ar: 'ضمان SLA' },
    ],
    cta: { en: 'Contact Sales', ar: 'تواصل مع المبيعات' },
    popular: false,
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

const cardVariants: Variants = {
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

export function Pricing() {
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="pricing" className="relative py-24 md:py-32" ref={ref}>
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />

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
            {locale === 'ar' ? 'الأسعار' : 'Pricing'}
          </motion.span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {locale === 'ar' ? 'خطط بسيطة وشفافة' : 'Simple, transparent pricing'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {locale === 'ar'
              ? 'اختر الخطة المناسبة لاحتياجاتك. لا رسوم مخفية.'
              : 'Choose the plan that fits your needs. No hidden fees.'
            }
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={cn(
                'relative rounded-3xl border p-8 transition-all duration-300',
                plan.popular
                  ? 'border-gold/50 bg-gradient-to-b from-gold/5 to-transparent shadow-xl shadow-gold/5'
                  : 'border-border bg-card hover:border-gold/30 hover:shadow-lg'
              )}
              style={{ willChange: 'transform' }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-sm font-medium text-gold-foreground">
                    <Sparkles className="h-4 w-4" />
                    {locale === 'ar' ? 'الأكثر شيوعاً' : 'Most Popular'}
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold">
                  {locale === 'ar' ? plan.nameAr : plan.nameEn}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {locale === 'ar' ? plan.descriptionAr : plan.descriptionEn}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold tracking-tight">
                  {locale === 'ar' ? plan.priceAr : plan.priceEn}
                </span>
                {(plan.periodEn || plan.periodAr) && (
                  <span className="text-muted-foreground">
                    {locale === 'ar' ? plan.periodAr : plan.periodEn}
                  </span>
                )}
              </div>

              {/* CTA Button */}
              <Link href="/register" className="block">
                <Button
                  className={cn(
                    'h-12 w-full rounded-xl text-base font-medium',
                    plan.popular
                      ? 'bg-gold text-gold-foreground hover:bg-gold/90'
                      : 'bg-foreground text-background hover:bg-foreground/90'
                  )}
                >
                  {plan.popular && <Zap className="me-2 h-4 w-4" />}
                  {locale === 'ar' ? plan.cta.ar : plan.cta.en}
                </Button>
              </Link>

              {/* Features */}
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                    <span className="text-sm text-muted-foreground">
                      {locale === 'ar' ? feature.ar : feature.en}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-center text-sm text-muted-foreground"
        >
          {locale === 'ar'
            ? 'جميع الخطط تشمل تجربة مجانية لمدة ١٤ يوماً. لا حاجة لبطاقة ائتمان.'
            : 'All plans include a 14-day free trial. No credit card required.'
          }
        </motion.p>
      </div>
    </section>
  );
}
