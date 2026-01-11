// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL LOADING STATE
// ═══════════════════════════════════════════════════════════════════════════════

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
      </header>

      {/* Content Skeleton */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-24">
          <div className="mx-auto max-w-4xl space-y-4 text-center">
            <Skeleton className="mx-auto h-16 w-3/4" />
            <Skeleton className="mx-auto h-6 w-1/2" />
            <Skeleton className="mx-auto mt-8 h-12 w-40" />
          </div>
        </div>
      </main>
    </div>
  );
}
