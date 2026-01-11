// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTIVITY FEATURE - TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'todo' | 'in_progress' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate?: string;
  completedAt?: string;
  projectId?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  taskCount: number;
  completedTaskCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarEvent {
  id: string;
  userId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  isAllDay: boolean;
  location?: string;
  color: string;
  reminders: number[]; // minutes before event
  recurrence?: RecurrenceRule;
  createdAt: string;
  updatedAt: string;
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  endDate?: string;
  count?: number;
  daysOfWeek?: number[]; // 0-6, Sunday to Saturday
}

export interface Habit {
  id: string;
  userId: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  targetDays: number[]; // 0-6 for weekly, empty for daily
  color: string;
  icon: string;
  streak: number;
  longestStreak: number;
  completions: HabitCompletion[];
  createdAt: string;
  updatedAt: string;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string;
  completedAt: string;
}
