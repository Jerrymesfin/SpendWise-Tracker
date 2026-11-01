import { Expense } from '../types/expense';

const STORAGE_KEY = 'spendwise_expenses_v1';
const CURRENCY_KEY = 'spendwise_currency_pref';

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: 'exp-1',
    title: 'Weekly Organic Grocery',
    amount: 54.80,
    category: 'Food',
    date: new Date(Date.now() - 86400000 * 0).toISOString().split('T')[0],
    createdAt: Date.now() - 86400000 * 0,
  },
  {
    id: 'exp-2',
    title: 'Metro Pass Card Reload',
    amount: 32.00,
    category: 'Transport',
    date: new Date(Date.now() - 86400000 * 1).toISOString().split('T')[0],
    createdAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'exp-3',
    title: 'Casual Canvas Sneakers',
    amount: 68.50,
    category: 'Shopping',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'exp-4',
    title: 'High-speed Fiber Internet',
    amount: 45.00,
    category: 'Other',
    date: new Date(Date.now() - 86400000 * 3).toISOString().split('T')[0],
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'exp-5',
    title: 'Artisan Cafe Latte & Croissant',
    amount: 7.25,
    category: 'Food',
    date: new Date(Date.now() - 86400000 * 4).toISOString().split('T')[0],
    createdAt: Date.now() - 86400000 * 4,
  },
];

export function getSavedExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // First visit: initialize with initial sample data so the dashboard is alive
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_EXPENSES));
      return INITIAL_EXPENSES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_EXPENSES;
  } catch (error) {
    console.warn('Failed to parse expenses from localStorage, resetting:', error);
    return INITIAL_EXPENSES;
  }
}

export function saveExpensesToStorage(expenses: Expense[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Failed to save expenses to localStorage:', error);
  }
}

export function getSavedCurrency(): string {
  try {
    return localStorage.getItem(CURRENCY_KEY) || '$';
  } catch {
    return '$';
  }
}

export function saveCurrencyToStorage(symbol: string): void {
  try {
    localStorage.setItem(CURRENCY_KEY, symbol);
  } catch (error) {
    console.error('Failed to save currency preference:', error);
  }
}

export function formatCurrency(amount: number, symbol: string = '$'): string {
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function exportToCSV(expenses: Expense[]): void {
  const headers = ['Title', 'Amount', 'Category', 'Date'];
  const rows = expenses.map(e => [
    `"${e.title.replace(/"/g, '""')}"`,
    e.amount.toFixed(2),
    e.category,
    e.date,
  ]);
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
