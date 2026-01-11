// ═══════════════════════════════════════════════════════════════════════════════
// SCROLL PROGRESS INDICATOR
// A subtle, elegant progress bar showing page scroll position
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
  color?: 'emerald' | 'gold' | 'gradient';
  height?: number;
  position?: 'top' | 'bottom';
}

export function ScrollProgress({
  color = 'gradient',
  height = 3,
  position = 'top',
}: ScrollProgressProps): React.ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = (): void => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colorClasses = {
    emerald: 'bg-emerald-500',
    gold: 'bg-gold',
    gradient: 'bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-500',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className={`fixed ${position === 'top' ? 'top-0' : 'bottom-0'} inset-x-0 z-[100]`}
    >
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className={`h-[${height}px] ${colorClasses[color]}`}
      />
    </motion.div>
  );
}
