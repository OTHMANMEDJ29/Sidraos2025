// ═══════════════════════════════════════════════════════════════════════════════
// COMMON VALIDATION SCHEMAS
// ═══════════════════════════════════════════════════════════════════════════════

import { z } from 'zod';

// UUID validation
export const uuidSchema = z.string().uuid('Invalid ID format');

// Pagination
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

// Date range
export const dateRangeSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
}).refine(
  (data) => {
    if (data.startDate && data.endDate) {
      return new Date(data.startDate) <= new Date(data.endDate);
    }
    return true;
  },
  { message: 'Start date must be before end date' }
);

export type DateRangeParams = z.infer<typeof dateRangeSchema>;

// Search
export const searchSchema = z.object({
  query: z.string().min(1).max(200),
});

export type SearchParams = z.infer<typeof searchSchema>;

// Sort
export const sortSchema = z.object({
  field: z.string(),
  direction: z.enum(['asc', 'desc']).default('desc'),
});

export type SortParams = z.infer<typeof sortSchema>;
