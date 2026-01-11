// ═══════════════════════════════════════════════════════════════════════════════
// SKELETON COMPONENTS
// Beautiful loading skeletons with shimmer animation
// ═══════════════════════════════════════════════════════════════════════════════

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

// Base skeleton with shimmer effect
export function Skeleton({ className, style }: SkeletonProps): React.ReactElement {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-muted/50',
        'after:absolute after:inset-0',
        'after:translate-x-[-100%] after:animate-[shimmer_2s_infinite]',
        'after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent',
        className
      )}
      style={style}
    />
  );
}

// Card skeleton for dashboard widgets
export function CardSkeleton({ className }: SkeletonProps): React.ReactElement {
  return (
    <div className={cn('rounded-2xl border border-border/50 bg-card p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-10 w-32 mb-2" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

// Table row skeleton
export function TableRowSkeleton(): React.ReactElement {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-border/50">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-32" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  );
}

// Dashboard grid skeleton
export function DashboardSkeleton(): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[180px]">
        <CardSkeleton className="lg:col-span-1 row-span-2" />
        <CardSkeleton className="lg:col-span-1 row-span-2" />
        <CardSkeleton className="lg:col-span-2 row-span-2" />
        <CardSkeleton className="lg:col-span-2" />
        <CardSkeleton className="lg:col-span-2" />
      </div>
    </div>
  );
}

// List skeleton
export function ListSkeleton({ count = 5 }: { count?: number }): React.ReactElement {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}

// Avatar skeleton
export function AvatarSkeleton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }): React.ReactElement {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return <Skeleton className={cn('rounded-full', sizeClasses[size])} />;
}

// Button skeleton
export function ButtonSkeleton({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }): React.ReactElement {
  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-24',
    lg: 'h-12 w-32',
  };

  return <Skeleton className={cn('rounded-lg', sizeClasses[size])} />;
}

// Chart skeleton with animated bars
export function ChartSkeleton(): React.ReactElement {
  return (
    <div className="flex items-end justify-between h-40 gap-2 pt-4">
      {[60, 80, 45, 90, 70, 85, 55].map((height, i) => (
        <Skeleton
          key={i}
          className="flex-1 rounded-t-md"
          style={{ 
            height: `${height}%`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
