import React, { useState } from 'react';
import { PlusCircle, Calendar, Tag, Check, Sparkles } from 'lucide-react';
import { ExpenseCategory } from '../types/expense';
import { CATEGORIES, QUICK_TITLE_SUGGESTIONS } from '../constants/categories';

interface ExpenseFormProps {
  onAddExpense: (expense: {
    title: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
  }) => void;
  currency: string;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense, currency }) => {
  const today = new Date().toISOString().split('T')[0];

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState(today);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Please provide an expense title.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid expense amount greater than 0.');
      return;
    }

    if (!date) {
      setError('Please select a valid date.');
      return;
    }

    setError(null);

    onAddExpense({
      title: trimmedTitle,
      amount: Math.round(parsedAmount * 100) / 100,
      category,
      date,
    });

    // Reset inputs
    setTitle('');
    setAmount('');
    setDate(today);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const applyQuickSuggestion = (item: { title: string; category: ExpenseCategory }) => {
    setTitle(item.title);
    setCategory(item.category);
    setError(null);
  };

  const categoriesList: ExpenseCategory[] = ['Food', 'Transport', 'Shopping', 'Other'];

  return (
    <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Add New Expense</h2>
          <p className="text-xs text-slate-500 mt-0.5">Record a title, amount, category, and date</p>
        </div>
        {justAdded && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium transition-all">
            <Check className="w-3.5 h-3.5" />
            Expense Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label htmlFor="expense-title" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Expense Title *
          </label>
          <div className="relative">
            <input
              id="expense-title"
              type="text"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (error) setError(null);
              }}
              placeholder="e.g. Weekly Groceries, Taxi fare, Books"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50 transition-all"
            />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="mt-2 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] text-slate-600 flex items-center gap-1 mr-1">
              <Sparkles className="w-3 h-3 text-purple-600" />
              Quick:
            </span>
            {QUICK_TITLE_SUGGESTIONS.slice(0, 4).map(item => (
              <button
                key={item.title}
                type="button"
                onClick={() => applyQuickSuggestion(item)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800 transition-colors"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Amount & Date in a 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Amount */}
          <div>
            <label htmlFor="expense-amount" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Amount ({currency}) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-sm pointer-events-none">
                {currency}
              </span>
              <input
                id="expense-amount"
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={e => {
                  setAmount(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="0.00"
                className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm font-mono text-slate-900 placeholder:text-slate-400 bg-slate-50/50 transition-all tabular-nums"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="expense-date" className="block text-xs font-semibold text-slate-700 mb-1.5">
              Date *
            </label>
            <div className="relative">
              <input
                id="expense-date"
                type="date"
                value={date}
                max={today}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 text-sm text-slate-900 bg-slate-50/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-purple-600" />
            Category *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {categoriesList.map(cat => {
              const meta = CATEGORIES[cat];
              const Icon = meta.icon;
              const isSelected = category === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-left ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/70 text-purple-900 shadow-xs ring-1 ring-purple-600/20'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-purple-600 text-white' : `${meta.bgColor} ${meta.color}`
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Error notification if any */}
        {error && (
          <div className="text-xs text-rose-600 bg-rose-50 border border-rose-200 px-3 py-2 rounded-xl">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-medium text-sm transition-all shadow-sm shadow-purple-600/20"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </form>
    </div>
  );
};
