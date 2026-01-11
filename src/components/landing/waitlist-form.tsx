'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, Check, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WaitlistFormProps {
  className?: string;
}

export function WaitlistForm({ className }: WaitlistFormProps): React.ReactElement {
  const t = useTranslations('landing.hero.waitlist');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [isFocused, setIsFocused] = useState(false);

  const fireConfetti = useCallback(() => {
    // Left side burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.3, y: 0.6 },
      colors: ['#10B981', '#059669', '#D4AF37', '#C9A227', '#F59E0B'],
      ticks: 200,
    });

    // Right side burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.7, y: 0.6 },
      colors: ['#10B981', '#059669', '#D4AF37', '#C9A227', '#F59E0B'],
      ticks: 200,
    });

    // Stars from center
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        shapes: ['star'],
        colors: ['#D4AF37', '#F59E0B'],
        scalar: 1.2,
      });
    }, 200);
  }, []);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!email || status === 'loading') return;

    setStatus('loading');

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setStatus('success');
    fireConfetti();

    // Reset after delay
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <div className={cn('w-full max-w-md', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          animate={{
            boxShadow: isFocused
              ? '0 0 0 3px rgba(16, 185, 129, 0.2), 0 10px 40px -10px rgba(0, 0, 0, 0.2)'
              : '0 4px 20px -5px rgba(0, 0, 0, 0.1)',
          }}
          className={cn(
            'relative flex items-center gap-2 p-1.5 rounded-full',
            'bg-background/80 backdrop-blur-xl border-2 transition-colors duration-300',
            isFocused ? 'border-emerald-500/50' : 'border-border',
            status === 'success' && 'border-emerald-500'
          )}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center justify-center gap-3 w-full py-3 px-4"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-emerald-600">
                  {t('success')}
                </span>
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 w-full"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder={t('placeholder')}
                  required
                  disabled={status === 'loading'}
                  className={cn(
                    'flex-1 bg-transparent px-4 py-3 text-base',
                    'placeholder:text-muted-foreground/60',
                    'focus:outline-none disabled:opacity-50',
                    'min-w-0'
                  )}
                />
                <motion.button
                  type="submit"
                  disabled={!email || status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-full',
                    'bg-gradient-to-r from-emerald-500 to-emerald-600',
                    'hover:from-emerald-600 hover:to-emerald-700',
                    'text-white font-semibold text-sm',
                    'transition-all duration-300',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'shadow-lg shadow-emerald-500/25'
                  )}
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <span className="hidden sm:inline">{t('button')}</span>
                      <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </form>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center text-sm text-muted-foreground mt-4"
      >
        {t('description')}
      </motion.p>
    </div>
  );
}
