import React from 'react';
import { Wallet, Code2, RotateCcw } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'code';
  setActiveTab: (tab: 'dashboard' | 'code') => void;
  currency: string;
  setCurrency: (c: string) => void;
  onResetDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  onResetDemo,
}) => {
  const currencies = ['$', '€', '£', '¥'];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-purple-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm shadow-purple-200">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-lg text-slate-900 tracking-tight block leading-none">
              SpendWise
            </span>
            <span className="text-xs text-purple-600 font-medium tracking-wide">
              Personal Expense Tracker
            </span>
          </div>
        </div>

        {/* Navigation & View switcher */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-purple-50 text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'code'
                ? 'bg-purple-50 text-purple-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>HTML / CSS / JS Files</span>
          </button>
        </nav>

        {/* Currency & Actions Zone */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-xs font-medium">
            {currencies.map(curr => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`w-6 h-6 rounded-md transition-all ${
                  currency === curr
                    ? 'bg-white text-purple-700 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title={`Switch currency to ${curr}`}
              >
                {curr}
              </button>
            ))}
          </div>

          <button
            onClick={onResetDemo}
            className="p-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
            title="Reset to sample demo expenses"
            aria-label="Reset demo expenses"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
