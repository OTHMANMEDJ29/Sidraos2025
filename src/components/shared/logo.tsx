'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
}

const sizeConfig = {
  sm: { svg: 32, text: 'text-lg' },
  md: { svg: 40, text: 'text-xl' },
  lg: { svg: 56, text: 'text-2xl' },
  xl: { svg: 80, text: 'text-4xl' },
};

export function Logo({ 
  className, 
  size = 'md', 
  showText = true,
  animated = true 
}: LogoProps): React.ReactElement {
  const config = sizeConfig[size];
  
  const logoVariants = {
    idle: {
      filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.3))',
    },
    hover: {
      filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.6))',
      scale: 1.05,
    },
  };

  const nodeVariants = {
    idle: { opacity: 0.6 },
    hover: { opacity: 1 },
  };

  const SvgLogo = (
    <svg
      viewBox="0 0 100 100"
      width={config.svg}
      height={config.svg}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Gradient Definitions */}
      <defs>
        {/* Emerald to Gold Gradient */}
        <linearGradient id="sidra-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
        
        {/* Gold Gradient */}
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
        
        {/* Glow Filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Base Circle - Geometric Frame */}
      <circle 
        cx="50" 
        cy="50" 
        r="46" 
        stroke="url(#sidra-gradient)" 
        strokeWidth="1.5" 
        strokeDasharray="4 6"
        fill="none"
        opacity="0.4"
      />
      
      {/* Lote Tree (Sidra) - Stylized */}
      {/* Main Trunk */}
      <motion.path
        d="M50 85 L50 55"
        stroke="url(#sidra-gradient)"
        strokeWidth="3"
        strokeLinecap="round"
        variants={nodeVariants}
        initial="idle"
        animate="idle"
      />
      
      {/* Left Branch */}
      <motion.path
        d="M50 65 Q35 55, 28 42"
        stroke="url(#sidra-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right Branch */}
      <motion.path
        d="M50 65 Q65 55, 72 42"
        stroke="url(#sidra-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Center Crown */}
      <motion.path
        d="M50 55 Q50 40, 50 30"
        stroke="url(#sidra-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Tree Crown Leaves - Geometric Circles */}
      {/* Top Node */}
      <motion.circle
        cx="50"
        cy="25"
        r="8"
        fill="url(#sidra-gradient)"
        filter="url(#glow)"
        variants={nodeVariants}
      />
      
      {/* Left Node */}
      <motion.circle
        cx="26"
        cy="38"
        r="6"
        fill="url(#sidra-gradient)"
        filter="url(#glow)"
        variants={nodeVariants}
      />
      
      {/* Right Node */}
      <motion.circle
        cx="74"
        cy="38"
        r="6"
        fill="url(#sidra-gradient)"
        filter="url(#glow)"
        variants={nodeVariants}
      />
      
      {/* Digital Circuitry Nodes - Connection Points */}
      {/* Left Circuit Node */}
      <motion.circle
        cx="18"
        cy="55"
        r="3"
        fill="url(#gold-gradient)"
        opacity="0.8"
        variants={nodeVariants}
      />
      <motion.path
        d="M26 38 L18 55"
        stroke="url(#gold-gradient)"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.5"
      />
      
      {/* Right Circuit Node */}
      <motion.circle
        cx="82"
        cy="55"
        r="3"
        fill="url(#gold-gradient)"
        opacity="0.8"
        variants={nodeVariants}
      />
      <motion.path
        d="M74 38 L82 55"
        stroke="url(#gold-gradient)"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.5"
      />
      
      {/* Top Circuit Nodes */}
      <motion.circle
        cx="35"
        cy="18"
        r="2"
        fill="url(#gold-gradient)"
        opacity="0.6"
        variants={nodeVariants}
      />
      <motion.circle
        cx="65"
        cy="18"
        r="2"
        fill="url(#gold-gradient)"
        opacity="0.6"
        variants={nodeVariants}
      />
      <motion.path
        d="M35 18 L50 25 L65 18"
        stroke="url(#gold-gradient)"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.4"
        fill="none"
      />
      
      {/* Root Nodes - Digital Foundation */}
      <motion.circle
        cx="38"
        cy="90"
        r="2"
        fill="url(#gold-gradient)"
        opacity="0.5"
        variants={nodeVariants}
      />
      <motion.circle
        cx="62"
        cy="90"
        r="2"
        fill="url(#gold-gradient)"
        opacity="0.5"
        variants={nodeVariants}
      />
      <motion.path
        d="M38 90 L50 85 L62 90"
        stroke="url(#gold-gradient)"
        strokeWidth="1"
        strokeDasharray="2 2"
        opacity="0.4"
        fill="none"
      />
    </svg>
  );

  return (
    <motion.div
      className={cn('flex items-center gap-2', className)}
      variants={animated ? logoVariants : undefined}
      initial="idle"
      whileHover="hover"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {SvgLogo}
      
      {showText && (
        <div className="flex flex-col">
          <span className={cn(
            config.text,
            'font-bold tracking-tight',
            'bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500',
            'bg-clip-text text-transparent'
          )}>
            SidraOS
          </span>
          {size === 'lg' || size === 'xl' ? (
            <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
              Life Operating System
            </span>
          ) : null}
        </div>
      )}
    </motion.div>
  );
}
