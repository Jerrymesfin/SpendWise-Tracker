import React from 'react';
import { Expense, ExpenseCategory } from '../types/expense';
import { CATEGORIES } from '../constants/categories';
import { formatCurrency } from '../utils/storage';

interface CategoryBreakdownProps {
  expenses: Expense[];
  currency: string;
}

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({ expenses, currency }) => {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const categories: ExpenseCategory[] = ['Food', 'Transport', 'Shopping', 'Other'];

  const stats = categories.map(cat => {
    const catExpenses = expenses.filter(e => e.category === cat);
    const amount = catExpenses.reduce((sum, e) => sum + e.amount, 0);
    const percentage = total > 0 ? (amount / total) * 100 : 0;
    return {
      category: cat,
      amount,
      count: catExpenses.length,
      percentage,
      meta: CATEGORIES[cat],
    };
  });

  return (
    <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Category Spending</h2>
          <p className="text-xs text-slate-500 mt-0.5">Budget allocation across active categories</p>
        </div>
        <span className="text-xs font-mono font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md tabular-nums">
          {formatCurrency(total, currency)} Total
        </span>
      </div>

      {/* Multi-segment progress bar */}
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex mb-5">
        {total === 0 ? (
          <div className="w-full h-full bg-slate-200" />
        ) : (
          stats.map(s => {
            if (s.percentage === 0) return null;
            let barColor = 'bg-slate-400';
            if (s.category === 'Food') barColor = 'bg-amber-500';
            if (s.category === 'Transport') barColor = 'bg-blue-500';
            if (s.category === 'Shopping') barColor = 'bg-purple-600';
            if (s.category === 'Other') barColor = 'bg-slate-500';

            return (
              <div
                key={s.category}
                style={{ width: `${s.percentage}%` }}
                className={`h-full transition-all duration-500 ${barColor}`}
                title={`${s.category}: ${s.percentage.toFixed(1)}%`}
              />
            );
          })
        )}
      </div>

      {/* Category List Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stats.map(s => {
          const Icon = s.meta.icon;
          return (
            <div
              key={s.category}
              className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.meta.bgColor} ${s.meta.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">
                    {s.category}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {s.count} {s.count === 1 ? 'item' : 'items'} · {s.percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-slate-900 font-mono tabular-nums block">
                  {formatCurrency(s.amount, currency)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
