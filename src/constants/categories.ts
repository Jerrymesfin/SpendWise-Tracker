import { Utensils, Car, ShoppingBag, MoreHorizontal } from 'lucide-react';
import { ExpenseCategory } from '../types/expense';

export interface CategoryMeta {
  label: ExpenseCategory;
  icon: typeof Utensils;
  color: string; // Tailwind text color
  bgColor: string; // Tailwind background
  borderColor: string;
  badgeBg: string;
}

export const CATEGORIES: Record<ExpenseCategory, CategoryMeta> = {
  Food: {
    label: 'Food',
    icon: Utensils,
    color: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    badgeBg: 'bg-amber-100 text-amber-800',
  },
  Transport: {
    label: 'Transport',
    icon: Car,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    badgeBg: 'bg-blue-100 text-blue-800',
  },
  Shopping: {
    label: 'Shopping',
    icon: ShoppingBag,
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    badgeBg: 'bg-purple-100 text-purple-800',
  },
  Other: {
    label: 'Other',
    icon: MoreHorizontal,
    color: 'text-slate-700',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-200',
    badgeBg: 'bg-slate-200 text-slate-800',
  },
};

export const QUICK_TITLE_SUGGESTIONS: { title: string; category: ExpenseCategory; amount?: number }[] = [
  { title: 'Groceries', category: 'Food' },
  { title: 'Coffee & Snack', category: 'Food' },
  { title: 'Subway / Bus', category: 'Transport' },
  { title: 'Gas Refuel', category: 'Transport' },
  { title: 'Clothing / Shoes', category: 'Shopping' },
  { title: 'Tech Gadget', category: 'Shopping' },
  { title: 'Utility Bill', category: 'Other' },
  { title: 'Mobile Phone', category: 'Other' },
];
