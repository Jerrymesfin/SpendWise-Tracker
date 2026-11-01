import React, { useState, useMemo } from 'react';
import { 
  Trash2, 
  Search, 
  ArrowUpDown, 
  Download, 
  Calendar,
  AlertCircle,
  Inbox
} from 'lucide-react';
import { Expense, FilterCategory, SortOption } from '../types/expense';
import { CATEGORIES } from '../constants/categories';
import { formatCurrency, exportToCSV } from '../utils/storage';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
  currency: string;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onDeleteExpense,
  currency,
}) => {
  const [filter, setFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filterTabs: FilterCategory[] = ['All', 'Food', 'Transport', 'Shopping', 'Other'];

  // Filtered and Sorted Expenses
  const processedExpenses = useMemo(() => {
    let result = [...expenses];

    // 1. Category Filter
    if (filter !== 'All') {
      result = result.filter(item => item.category === filter);
    }

    // 2. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.amount.toString().includes(q)
      );
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortOption === 'date-desc') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortOption === 'date-asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortOption === 'amount-desc') {
        return b.amount - a.amount;
      }
      if (sortOption === 'amount-asc') {
        return a.amount - b.amount;
      }
      return 0;
    });

    return result;
  }, [expenses, filter, searchQuery, sortOption]);

  const confirmDelete = (id: string) => {
    onDeleteExpense(id);
    setDeletingId(null);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Transaction History</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {processedExpenses.length} of {expenses.length} recorded {expenses.length === 1 ? 'expense' : 'expenses'}
          </p>
        </div>

        {/* Action button to export CSV if there are items */}
        {expenses.length > 0 && (
          <button
            onClick={() => exportToCSV(expenses)}
            className="self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
            title="Download your expenses as a CSV file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        )}
      </div>

      {/* Interactive Category Filter Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {filterTabs.map(tab => {
          const isActive = filter === tab;
          const count = tab === 'All' 
            ? expenses.length 
            : expenses.filter(e => e.category === tab).length;

          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-purple-700/60 text-white' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search and Sort Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 mb-4">
        {/* Search */}
        <div className="sm:col-span-8 relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by title or amount..."
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
          />
        </div>

        {/* Sort selector */}
        <div className="sm:col-span-4 relative">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value as SortOption)}
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all appearance-none cursor-pointer"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Transaction List */}
      <div className="space-y-2.5">
        {processedExpenses.length === 0 ? (
          <div className="py-12 px-4 text-center border border-dashed border-purple-100 rounded-xl bg-purple-50/30">
            <div className="w-10 h-10 mx-auto rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-2.5">
              <Inbox className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">No expenses found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              {searchQuery || filter !== 'All'
                ? 'Try clearing the search query or switching the category filter tab.'
                : 'Get started by filling out the form on the left to add your first expense!'}
            </p>
            {(searchQuery || filter !== 'All') && (
              <button
                onClick={() => {
                  setFilter('All');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-medium text-purple-600 hover:text-purple-700 underline underline-offset-4"
              >
                Reset filters
              </button>
            )}
          </div>
        ) : (
          processedExpenses.map(item => {
            const catMeta = CATEGORIES[item.category];
            const Icon = catMeta.icon;
            const isConfirmingDelete = deletingId === item.id;

            return (
              <div
                key={item.id}
                className="group p-3 sm:p-3.5 rounded-xl border border-slate-100 hover:border-purple-200 hover:bg-purple-50/20 transition-all flex items-center justify-between gap-3"
              >
                {/* Left: Category Icon & Details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${catMeta.bgColor} ${catMeta.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {item.title}
                    </p>

                    {/* Unboxed Metadata (Zero-pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{item.category}</span>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Delete Button */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-mono tabular-nums">
                    {formatCurrency(item.amount, currency)}
                  </span>

                  {isConfirmingDelete ? (
                    <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 p-1 rounded-lg">
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="px-2 py-0.5 text-[11px] font-semibold bg-rose-600 text-white rounded hover:bg-rose-700 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeletingId(null)}
                        className="px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeletingId(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete expense"
                      aria-label={`Delete ${item.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
