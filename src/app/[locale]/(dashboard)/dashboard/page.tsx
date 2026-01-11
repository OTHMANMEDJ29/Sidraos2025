'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { 
  Play, 
  Pause, 
  Clock,
  Sunset,
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  CheckCircle2,
  Calendar,
  Brain
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

// Lazy load recharts for better performance
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

// Prayer times data
const prayerTimesData = [
  { nameKey: 'fajr', nameEn: 'Fajr', nameAr: 'الفجر', time: '05:42' },
  { nameKey: 'dhuhr', nameEn: 'Dhuhr', nameAr: 'الظهر', time: '12:15' },
  { nameKey: 'asr', nameEn: 'Asr', nameAr: 'العصر', time: '15:23' },
  { nameKey: 'maghrib', nameEn: 'Maghrib', nameAr: 'المغرب', time: '17:48' },
  { nameKey: 'isha', nameEn: 'Isha', nameAr: 'العشاء', time: '19:12' },
];

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function BentoCard({ children, className, delay = 0 }: BentoCardProps): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        'rounded-3xl border border-border/50 bg-card p-6',
        'hover:border-border hover:shadow-lg transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

function FocusTimer(): React.ReactElement {
  const t = useTranslations('dashboard');
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60); // 25 minutes
  const totalSeconds = 25 * 60;
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const formatTime = (secs: number): string => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-lg font-semibold mb-6">{t('focusState')}</h3>
      
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background Circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted/30"
          />
          {/* Progress Circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#focusGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300"
          />
          <defs>
            <linearGradient id="focusGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#D4AF37" />
            </linearGradient>
          </defs>
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold font-mono">{formatTime(seconds)}</span>
          <span className="text-sm text-muted-foreground mt-1">{t('deepWork')}</span>
        </div>
      </div>

      <button
        onClick={() => setIsActive(!isActive)}
        className={cn(
          'mt-6 w-14 h-14 rounded-full flex items-center justify-center transition-all',
          isActive 
            ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
        )}
      >
        {isActive ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ms-1" />}
      </button>
    </div>
  );
}

function PrayerTimesWidget(): React.ReactElement {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  // Determine next prayer (mock - Maghrib)
  const nextPrayerIndex = 3;
  const now = new Date();
  const nextPrayerTime = new Date();
  nextPrayerTime.setHours(17, 48, 0);
  
  const diffMs = nextPrayerTime.getTime() - now.getTime();
  const diffMins = Math.max(0, Math.floor(diffMs / 60000));
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">{t('prayerTimes')}</h3>
        <Clock className="w-5 h-5 text-muted-foreground" />
      </div>

      {/* Next Prayer Highlight */}
      <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Sunset className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{t('nextPrayer')}</p>
            <p className="text-xl font-bold">
              {isRTL ? prayerTimesData[nextPrayerIndex].nameAr : prayerTimesData[nextPrayerIndex].nameEn}
            </p>
          </div>
          <div className="ms-auto text-end">
            <p className="text-2xl font-bold font-mono">{prayerTimesData[nextPrayerIndex].time}</p>
            <p className="text-xs text-muted-foreground">
              {t('timeRemaining', { hours, mins })}
            </p>
          </div>
        </div>
      </div>

      {/* Prayer List */}
      <div className="flex-1 space-y-2">
        {prayerTimesData.map((prayer, index) => (
          <div
            key={prayer.nameKey}
            className={cn(
              'flex items-center justify-between py-2 px-3 rounded-xl transition-colors',
              index === nextPrayerIndex 
                ? 'bg-amber-500/5 text-amber-600' 
                : 'text-muted-foreground hover:bg-muted/50'
            )}
          >
            <span className="text-sm font-medium">
              {isRTL ? prayer.nameAr : prayer.nameEn}
            </span>
            <span className="text-sm font-mono">{prayer.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinancialsWidget(): React.ReactElement {
  const t = useTranslations('dashboard');
  const locale = useLocale();
  
  // Get localized month names
  const getLocalizedMonthName = (monthKey: string): string => {
    return t(`months.${monthKey.toLowerCase()}`);
  };

  // Mock data for charts with localized month names
  const financialData = [
    { name: getLocalizedMonthName('jan'), income: 4000, expenses: 2400 },
    { name: getLocalizedMonthName('feb'), income: 3000, expenses: 1398 },
    { name: getLocalizedMonthName('mar'), income: 5000, expenses: 3800 },
    { name: getLocalizedMonthName('apr'), income: 2780, expenses: 3908 },
    { name: getLocalizedMonthName('may'), income: 6890, expenses: 2800 },
    { name: getLocalizedMonthName('jun'), income: 7390, expenses: 3800 },
    { name: getLocalizedMonthName('jul'), income: 5490, expenses: 4300 },
  ];
  
  const totalIncome = financialData.reduce((acc, d) => acc + d.income, 0);
  const totalExpenses = financialData.reduce((acc, d) => acc + d.expenses, 0);

  // Format currency based on locale
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: locale === 'ar' ? 'SAR' : 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{t('financials')}</h3>
        <span className="text-sm text-muted-foreground">{t('thisMonth')}</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-emerald-500/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-muted-foreground">{t('income')}</span>
          </div>
          <p className="text-2xl font-bold text-emerald-600">
            {formatCurrency(totalIncome)}
          </p>
        </div>
        <div className="bg-red-500/5 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <span className="text-sm text-muted-foreground">{t('expenses')}</span>
          </div>
          <p className="text-2xl font-bold text-red-500">
            {formatCurrency(totalExpenses)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={financialData}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-border" opacity={0.3} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="currentColor" className="text-muted-foreground" />
            <YAxis tick={{ fontSize: 12 }} stroke="currentColor" className="text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#incomeGradient)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#EF4444"
              strokeWidth={2}
              fill="url(#expenseGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function QuickStatsWidget(): React.ReactElement {
  const t = useTranslations('dashboard');
  
  const stats = [
    { icon: Target, labelKey: 'goals', value: '8/12', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { icon: CheckCircle2, labelKey: 'tasks', value: '24', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: Calendar, labelKey: 'events', value: '5', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { icon: Brain, labelKey: 'notes', value: '156', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 h-full content-center">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.labelKey}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className={cn(
              'flex flex-col items-center justify-center p-4 rounded-2xl',
              stat.bg
            )}
          >
            <Icon className={cn('w-6 h-6 mb-2', stat.color)} />
            <span className="text-2xl font-bold">{stat.value}</span>
            <span className="text-xs text-muted-foreground">{t(stat.labelKey)}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

function WalletWidget(): React.ReactElement {
  const t = useTranslations('dashboard');
  const locale = useLocale();

  // Format currency based on locale
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: locale === 'ar' ? 'SAR' : 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-white relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -end-10 -top-10 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute -end-5 -top-5 w-24 h-24 border-2 border-white rounded-full" />
        </div>
        
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <Wallet className="w-5 h-5" />
            <span className="text-sm opacity-80">{t('totalBalance')}</span>
          </div>
          <p className="text-3xl font-bold mb-1">{formatCurrency(24562)}</p>
          <p className="text-sm opacity-70">
            <span className="text-emerald-300">+12.5%</span> {t('fromLastMonth')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage(): React.ReactElement {
  const t = useTranslations('dashboard');

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold">{t('welcome')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[180px]">
          {/* Focus Timer - Large */}
          <BentoCard className="md:col-span-1 lg:col-span-1 row-span-2" delay={0.1}>
            <FocusTimer />
          </BentoCard>

          {/* Prayer Times */}
          <BentoCard className="md:col-span-1 lg:col-span-1 row-span-2" delay={0.2}>
            <PrayerTimesWidget />
          </BentoCard>

          {/* Financials - Wide */}
          <BentoCard className="md:col-span-2 lg:col-span-2 row-span-2" delay={0.3}>
            <FinancialsWidget />
          </BentoCard>

          {/* Quick Stats */}
          <BentoCard className="md:col-span-1 lg:col-span-2 row-span-1" delay={0.4}>
            <QuickStatsWidget />
          </BentoCard>

          {/* Wallet */}
          <BentoCard className="md:col-span-1 lg:col-span-2 row-span-1" delay={0.5}>
            <WalletWidget />
          </BentoCard>
        </div>
      </div>
    </div>
  );
}
