/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { StatCards } from './components/StatCards';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { CategoryBreakdown } from './components/CategoryBreakdown';
import { SourceCodeViewer } from './components/SourceCodeViewer';
import { Expense, ExpenseCategory } from './types/expense';
import { 
  getSavedExpenses, 
  saveExpensesToStorage, 
  getSavedCurrency, 
  saveCurrencyToStorage,
  INITIAL_EXPENSES
} from './utils/storage';
import { Undo2, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'code'>('dashboard');
  const [expenses, setExpenses] = useState<Expense[]>(() => getSavedExpenses());
  const [currency, setCurrencyState] = useState<string>(() => getSavedCurrency());
  
  // Undo Toast state
  const [lastDeleted, setLastDeleted] = useState<{ item: Expense; index: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync expenses with LocalStorage whenever changed
  useEffect(() => {
    saveExpensesToStorage(expenses);
  }, [expenses]);

  const handleCurrencyChange = (newSymbol: string) => {
    setCurrencyState(newSymbol);
    saveCurrencyToStorage(newSymbol);
  };

  const handleAddExpense = (data: {
    title: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
  }) => {
    const newExpense: Expense = {
      id: `exp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: data.title,
      amount: data.amount,
      category: data.category,
      date: data.date,
      createdAt: Date.now(),
    };

    setExpenses(prev => [newExpense, ...prev]);
    showToast(`Added "${newExpense.title}"`);
  };

  const handleDeleteExpense = (id: string) => {
    const itemToDelete = expenses.find(e => e.id === id);
    const index = expenses.findIndex(e => e.id === id);

    if (itemToDelete && index !== -1) {
      setLastDeleted({ item: itemToDelete, index });
      setExpenses(prev => prev.filter(e => e.id !== id));
      showToast(`Deleted "${itemToDelete.title}"`);
    }
  };

  const handleUndoDelete = () => {
    if (lastDeleted) {
      setExpenses(prev => {
        const next = [...prev];
        next.splice(lastDeleted.index, 0, lastDeleted.item);
        return next;
      });
      setLastDeleted(null);
      showToast(`Restored "${lastDeleted.item.title}"`);
    }
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset transactions to the original demo sample data?')) {
      setExpenses([...INITIAL_EXPENSES]);
      setLastDeleted(null);
      showToast('Reset to demo sample data');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => (current === msg ? null : current));
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FC] flex flex-col text-slate-900 selection:bg-purple-200 selection:text-purple-900">
      {/* Top Bar Contract Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={handleCurrencyChange}
        onResetDemo={handleResetDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {activeTab === 'dashboard' ? (
          <>
            {/* Top Stat Summary Cards */}
            <StatCards expenses={expenses} currency={currency} />

            {/* Split Dashboard View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Form & Visual Breakdown */}
              <div className="lg:col-span-5 space-y-6">
                <ExpenseForm onAddExpense={handleAddExpense} currency={currency} />
                <CategoryBreakdown expenses={expenses} currency={currency} />
              </div>

              {/* Right Column: Transactions List with Filters */}
              <div className="lg:col-span-7">
                <ExpenseList
                  expenses={expenses}
                  onDeleteExpense={handleDeleteExpense}
                  currency={currency}
                />
              </div>
            </div>
          </>
        ) : (
          /* Beginner Code & Architecture View */
          <SourceCodeViewer />
        )}
      </main>

      {/* Undo Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm animate-fade-in border border-slate-800">
          <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
          <span className="font-medium truncate max-w-xs">{toastMessage}</span>
          {lastDeleted && toastMessage.startsWith('Deleted') && (
            <button
              onClick={handleUndoDelete}
              className="flex items-center gap-1 ml-2 font-semibold text-purple-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              <Undo2 className="w-3.5 h-3.5" />
              Undo
            </button>
          )}
        </div>
      )}

      {/* Quiet Footer */}
      <footer className="mt-auto border-t border-purple-100 bg-white/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            SpendWise — Modern Personal Expense Tracker · Soft Purple Theme
          </p>
          <p className="text-slate-600 font-mono text-[11px]">
            Data saved locally via browser LocalStorage
          </p>
        </div>
      </footer>
    </div>
  );
}
