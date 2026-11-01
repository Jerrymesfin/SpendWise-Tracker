import React from 'react';
import { DollarSign, ReceiptText, TrendingUp, PieChart } from 'lucide-react';
import { Expense, ExpenseCategory } from '../types/expense';
import { formatCurrency } from '../utils/storage';

interface StatCardsProps {
  expenses: Expense[];
  currency: string;
}

export const StatCards: React.FC<StatCardsProps> = ({ expenses, currency }) => {
  const totalSpent = expenses.reduce((sum, item) => sum + item.amount, 0);
  const totalCount = expenses.length;

  const averageExpense = totalCount > 0 ? totalSpent / totalCount : 0;

  // Calculate highest spending category
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  const topCategory = React.useMemo(() => {
    let top: { name: string; amount: number } | null = null;
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (!top || amt > top.amount) {
        top = { name: cat, amount: amt };
      }
    }
    return top;
  }, [categoryTotals]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Spent Card - Highlight card with soft purple tone */}
      <div className="bg-gradient-to-br from-purple-700 to-purple-800 text-white rounded-2xl p-5 shadow-sm shadow-purple-900/10 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center justify-between mb-3 relative z-10">
          <span className="text-xs font-medium text-purple-200">Total Spent</span>
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-purple-100">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="relative z-10">
          <div className="text-2xl sm:text-3xl font-bold tracking-tight font-mono tabular-nums">
            {formatCurrency(totalSpent, currency)}
          </div>
          <p className="text-xs text-purple-200/90 mt-1">
            Across {totalCount} {totalCount === 1 ? 'logged expense' : 'logged expenses'}
          </p>
        </div>
      </div>

      {/* Number of Expenses Card */}
      <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500">Expenses Count</span>
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <ReceiptText className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-mono tabular-nums">
            {totalCount}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {totalCount === 0 ? 'No transactions yet' : 'Total transactions'}
          </p>
        </div>
      </div>

      {/* Average Expense Card */}
      <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500">Average Expense</span>
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-mono tabular-nums">
            {formatCurrency(averageExpense, currency)}
          </div>
          <p className="text-xs text-slate-500 mt-1">Per transaction average</p>
        </div>
      </div>

      {/* Top Spending Category */}
      <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-slate-500">Top Category</span>
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <PieChart className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate">
            {topCategory ? topCategory.name : '—'}
          </div>
          <p className="text-xs text-slate-500 mt-1 font-mono tabular-nums">
            {topCategory ? formatCurrency(topCategory.amount, currency) : 'No spending data'}
          </p>
        </div>
      </div>
    </div>
  );
};
