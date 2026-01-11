// ═══════════════════════════════════════════════════════════════════════════════
// FINANCE FEATURE - TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

export type TransactionType = 'income' | 'expense' | 'transfer';

export type TransactionCategory =
  | 'salary'
  | 'freelance'
  | 'investment'
  | 'food'
  | 'transport'
  | 'utilities'
  | 'entertainment'
  | 'shopping'
  | 'health'
  | 'education'
  | 'other';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  currency: string;
  description: string;
  date: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  userId: string;
  name: string;
  type: 'cash' | 'bank' | 'credit' | 'investment';
  balance: number;
  currency: string;
  color: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  id: string;
  userId: string;
  category: TransactionCategory;
  amount: number;
  spent: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  savingsRate: number;
  topCategories: Array<{
    category: TransactionCategory;
    amount: number;
    percentage: number;
  }>;
}
