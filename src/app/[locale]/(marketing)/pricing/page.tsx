'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Sparkles, Building2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PricingPage(): React.ReactElement {
  const t = useTranslations('pricing');
  const locale = useLocale();
  const [isYearly, setIsYearly] = useState(true);

  const plans = [
    {
      key: 'free',
      icon: Zap,
      color: 'emerald',
      gradient: 'from-emerald-500/10 to-teal-500/10',
      borderColor: 'border-emerald-500/20',
      iconColor: 'text-emerald-500',
      buttonVariant: 'outline' as const,
    },
    {
      key: 'pro',
      icon: Sparkles,
      color: 'gold',
      gradient: 'from-amber-500/10 to-orange-500/10',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-500',
      popular: true,
      buttonVariant: 'default' as const,
    },
    {
      key: 'enterprise',
      icon: Building2,
      color: 'purple',
      gradient: 'from-purple-500/10 to-pink-500/10',
      borderColor: 'border-purple-500/20',
      iconColor: 'text-purple-500',
      buttonVariant: 'outline' as const,
    },
  ];

  return (
    <div className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 end-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            {t('subtitle')}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 p-1.5 rounded-full bg-muted/50 border border-border">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all',
                !isYearly
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t('monthly')}
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                'px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2',
                isYearly
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t('yearly')}
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600">
                {t('savePercent', { percent: 30 })}
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const features = t.raw(`${plan.key}.features`) as string[];
            const price = plan.key === 'enterprise' 
              ? t(`${plan.key}.price`)
              : isYearly && plan.key === 'pro'
                ? t(`${plan.key}.yearlyPrice`)
                : t(`${plan.key}.price`);
            
            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  'relative rounded-3xl border-2 p-8 transition-all duration-300',
                  'hover:shadow-2xl hover:-translate-y-1',
                  plan.popular 
                    ? 'bg-gradient-to-b from-amber-500/5 to-transparent border-amber-500/30 shadow-xl' 
                    : `bg-gradient-to-b ${plan.gradient} ${plan.borderColor}`
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold shadow-lg">
                      {t('mostPopular')}
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={cn(
                    'inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4',
                    `bg-${plan.color}-500/10`
                  )}>
                    <Icon className={cn('w-7 h-7', plan.iconColor)} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {t(`${plan.key}.name`)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(`${plan.key}.description`)}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  {plan.key !== 'enterprise' ? (
                    <>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold">${price}</span>
                        <span className="text-muted-foreground">
                          {isYearly ? t('perYear') : t('perMonth')}
                        </span>
                      </div>
                      {isYearly && plan.key === 'pro' && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {t('billedAnnually')}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="text-4xl font-bold">{price}</div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className={cn(
                        'w-5 h-5 mt-0.5 flex-shrink-0',
                        plan.iconColor
                      )} />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  asChild
                  className={cn(
                    'w-full h-12 text-base font-semibold',
                    plan.popular && 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0'
                  )}
                  variant={plan.buttonVariant}
                >
                  <Link href={plan.key === 'enterprise' ? `/${locale}/contact` : `/${locale}/register`}>
                    {plan.key === 'enterprise' ? t('contactSales') : t('getStarted')}
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* FAQ Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground">
            Have questions?{' '}
            <Link 
              href={`/${locale}/contact`} 
              className="text-foreground font-medium hover:underline underline-offset-4"
            >
              Contact our team
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
