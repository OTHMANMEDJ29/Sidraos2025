// ═══════════════════════════════════════════════════════════════════════════════
// GLOBAL TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

// Re-export feature types for convenience
export * from '@/features/auth/types';
export * from '@/features/finance/types';
export * from '@/features/productivity/types';
export * from '@/features/second-brain/types';

// ─────────────────────────────────────────────────────────────────────────────
// COMMON TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type Locale = 'ar' | 'en';

export type Direction = 'rtl' | 'ltr';

export type Theme = 'light' | 'dark' | 'system';

// ─────────────────────────────────────────────────────────────────────────────
// API RESPONSE TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type WithTimestamps = {
  createdAt: string;
  updatedAt: string;
};

export type WithId = {
  id: string;
};

export type Nullable<T> = T | null;

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
