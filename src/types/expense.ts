export type ExpenseCategory = 'Food' | 'Transport' | 'Shopping' | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // YYYY-MM-DD format
  createdAt: number;
}

export type FilterCategory = 'All' | ExpenseCategory;

export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';
