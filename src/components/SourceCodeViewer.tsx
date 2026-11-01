import React, { useState } from 'react';
import { Copy, Check, FileCode, Layers, Info, BookOpen } from 'lucide-react';

export const SourceCodeViewer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  const fileExplanations = {
    html: {
      name: 'index.html',
      badge: 'Markup & Structure',
      description:
        'Defines the semantic skeleton of the Personal Expense Tracker. It establishes the header, the summary cards for total spent & count, the input form (title, amount, category, date), the category filter buttons, and the unordered transaction list container.',
      keyConcepts: [
        '<form id="expense-form">: Captures user input with specific types (text, number, date, select).',
        '<div id="total-spent">: Placeholder node where JS injects dynamic currency calculations.',
        '<div class="filters">: Button group with data-category attributes for instant filtering.',
        '<ul id="transaction-list">: The target DOM element where expense items are dynamically appended.',
      ],
    },
    css: {
      name: 'style.css',
      badge: 'Design & Presentation',
      description:
        'Styles the application with a clean, soft purple and white aesthetic. Uses modern CSS variables (:root), responsive CSS Grid and Flexbox, rounded corners (border-radius: 16px), subtle shadows, and responsive media queries for mobile.',
      keyConcepts: [
        'CSS Variables: --primary-purple (#7c3aed), --bg-canvas (#f8f7fc), --card-bg (#ffffff).',
        'Responsive Grid: Automatically stacks into 1 column on mobile and 2-4 columns on desktop.',
        'Card Design: Clean border lines, rounded-2xl radii, and hover transitions.',
        'Zero-Pill Metadata: Simple typographic dots (·) separating categories and dates.',
      ],
    },
    js: {
      name: 'script.js',
      badge: 'Logic & LocalStorage',
      description:
        'Contains the complete client-side application logic. Handles DOM event listeners, validates inputs, manages the expenses array, performs category filtering and calculations, and persists data to browser LocalStorage so entries remain after page refresh.',
      keyConcepts: [
        'localStorage.getItem() & setItem(): Reads and writes expenses as JSON strings for persistent data storage.',
        'Event Delegation & Listeners: Handles form submission (submit) and item deletion (click).',
        'Array Methods: Uses .reduce() for total spent, .filter() for categories, and .map() to render items.',
        'Pure Vanilla JS: Zero external frameworks or libraries needed.',
      ],
    },
  };

  const fileCode: Record<'html' | 'css' | 'js', string> = {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Personal Expense Tracker</title>
  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <!-- Stylesheet -->
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="app-container">
    <!-- Header -->
    <header class="app-header">
      <div class="brand">
        <div class="brand-icon">🟣</div>
        <div>
          <h1>SpendWise</h1>
          <p class="subtitle">Personal Expense Tracker</p>
        </div>
      </div>
      <button id="reset-demo-btn" class="secondary-btn" title="Reset sample data">Reset Demo</button>
    </header>

    <!-- Top Summary Cards -->
    <section class="stats-grid">
      <div class="stat-card primary">
        <span class="stat-label">Total Spent</span>
        <h2 id="total-spent" class="stat-value">$0.00</h2>
        <span class="stat-subtext">Across all logged items</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Expenses Count</span>
        <h2 id="total-count" class="stat-value">0</h2>
        <span class="stat-subtext">Total transactions</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Top Category</span>
        <h2 id="top-category" class="stat-value">—</h2>
        <span class="stat-subtext">Highest spending area</span>
      </div>
    </section>

    <!-- Main Dashboard Split Layout -->
    <main class="dashboard-grid">
      <!-- Left Column: Add Expense Form -->
      <section class="card form-card">
        <h3>Add New Expense</h3>
        <p class="card-subtitle">Fill in the details below to record an expense</p>

        <form id="expense-form">
          <div class="form-group">
            <label for="expense-title">Expense Title *</label>
            <input type="text" id="expense-title" placeholder="e.g. Grocery, Metro pass" required />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="expense-amount">Amount ($) *</label>
              <input type="number" id="expense-amount" step="0.01" min="0.01" placeholder="0.00" required />
            </div>
            <div class="form-group">
              <label for="expense-date">Date *</label>
              <input type="date" id="expense-date" required />
            </div>
          </div>

          <div class="form-group">
            <label for="expense-category">Category *</label>
            <select id="expense-category" required>
              <option value="Food">🍽️ Food</option>
              <option value="Transport">🚗 Transport</option>
              <option value="Shopping">🛍️ Shopping</option>
              <option value="Other">📦 Other</option>
            </select>
          </div>

          <button type="submit" class="submit-btn">+ Add Expense</button>
        </form>
      </section>

      <!-- Right Column: Transactions & Filters -->
      <section class="card list-card">
        <div class="list-header">
          <div>
            <h3>Transactions</h3>
            <p class="card-subtitle">Track and manage past expenses</p>
          </div>
        </div>

        <!-- Category Filters -->
        <div class="filter-bar">
          <button class="filter-btn active" data-category="All">All</button>
          <button class="filter-btn" data-category="Food">Food</button>
          <button class="filter-btn" data-category="Transport">Transport</button>
          <button class="filter-btn" data-category="Shopping">Shopping</button>
          <button class="filter-btn" data-category="Other">Other</button>
        </div>

        <!-- Transactions Container -->
        <ul id="expense-list" class="expense-list">
          <!-- Dynamically populated by script.js -->
        </ul>
        <div id="empty-state" class="empty-state hidden">
          <p>No expenses found in this category.</p>
        </div>
      </section>
    </main>
  </div>

  <!-- JavaScript -->
  <script src="script.js"></script>
</body>
</html>`,
    css: `/* ========================================================
   SPENDWISE - PERSONAL EXPENSE TRACKER
   Color Palette: Soft Purple & Clean White
======================================================== */

:root {
  --primary-purple: #7c3aed;
  --primary-purple-hover: #6d28d9;
  --purple-light: #f5f3ff;
  --purple-border: #ede9fe;
  --purple-text: #5b21b6;
  
  --bg-body: #f8f7fc;
  --card-bg: #ffffff;
  --text-main: #1e1b4b;
  --text-muted: #64748b;
  --border-light: #e2e8f0;
  
  --danger: #ef4444;
  --danger-light: #fef2f2;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

body {
  background-color: var(--bg-body);
  color: var(--text-main);
  padding: 24px 16px;
  line-height: 1.5;
}

.app-container {
  max-width: 1040px;
  margin: 0 auto;
}

/* Header */
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  font-size: 28px;
}

.brand h1 {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-main);
}

.subtitle {
  font-size: 13px;
  color: var(--primary-purple);
  font-weight: 500;
}

.secondary-btn {
  background: white;
  border: 1px solid var(--purple-border);
  color: var(--primary-purple);
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.secondary-btn:hover {
  background: var(--purple-light);
}

/* Summary Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--card-bg);
  border: 1px solid var(--purple-border);
  padding: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
}

.stat-card.primary {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  color: #ffffff;
  border: none;
}

.stat-card.primary .stat-label,
.stat-card.primary .stat-subtext {
  color: #e9d5ff;
}

.stat-card.primary .stat-value {
  color: #ffffff;
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-main);
  font-variant-numeric: tabular-nums;
  margin-bottom: 4px;
}

.stat-subtext {
  font-size: 12px;
  color: var(--text-muted);
}

/* Dashboard Split */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 860px) {
  .dashboard-grid {
    grid-template-columns: 360px 1fr;
  }
}

/* Cards */
.card {
  background: var(--card-bg);
  border: 1px solid var(--purple-border);
  border-radius: 16px;
  padding: 24px;
}

.card h3 {
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 4px;
}

.card-subtitle {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 18px;
}

/* Form Styles */
.form-group {
  margin-bottom: 14px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 6px;
}

input, select {
  width: 100%;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border-light);
  background: #fdfdfd;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

input:focus, select:focus {
  border-color: var(--primary-purple);
  box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
}

.submit-btn {
  width: 100%;
  background: var(--primary-purple);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 8px;
}

.submit-btn:hover {
  background: var(--primary-purple-hover);
}

/* Filter Bar */
.filter-bar {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  margin-bottom: 16px;
}

.filter-btn {
  background: #f1f5f9;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.filter-btn.active {
  background: var(--primary-purple);
  color: white;
}

/* Expense List Items */
.expense-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.expense-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid var(--border-light);
  border-radius: 12px;
  transition: background 0.2s;
}

.expense-item:hover {
  background: var(--purple-light);
  border-color: var(--purple-border);
}

.expense-info h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-main);
}

.expense-meta {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.expense-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.expense-amount {
  font-size: 15px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text-main);
}

.delete-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  font-size: 14px;
  transition: color 0.2s;
}

.delete-btn:hover {
  color: var(--danger);
  background: var(--danger-light);
}

.empty-state {
  text-align: center;
  padding: 36px 12px;
  color: var(--text-muted);
  font-size: 14px;
}

.hidden {
  display: none;
}`,
    js: `// ========================================================
// SPENDWISE - JAVASCRIPT APPLICATION LOGIC
// 1. LocalStorage Persistence
// 2. Add, Filter, and Delete Expenses
// 3. Dynamic Calculation of Totals & Counts
// ========================================================

const STORAGE_KEY = 'spendwise_vanilla_expenses';

// Sample starter data for first-time visitors
const DEFAULT_EXPENSES = [
  { id: '1', title: 'Fresh Groceries', amount: 48.50, category: 'Food', date: '2026-10-30' },
  { id: '2', title: 'Subway Reload', amount: 20.00, category: 'Transport', date: '2026-10-29' },
  { id: '3', title: 'Casual Hoodie', amount: 45.00, category: 'Shopping', date: '2026-10-28' },
  { id: '4', title: 'Internet Subscription', amount: 50.00, category: 'Other', date: '2026-10-27' },
];

// App State
let expenses = loadExpenses();
let currentFilter = 'All';

// DOM Elements
const form = document.getElementById('expense-form');
const titleInput = document.getElementById('expense-title');
const amountInput = document.getElementById('expense-amount');
const dateInput = document.getElementById('expense-date');
const categorySelect = document.getElementById('expense-category');

const expenseList = document.getElementById('expense-list');
const emptyState = document.getElementById('empty-state');
const totalSpentEl = document.getElementById('total-spent');
const totalCountEl = document.getElementById('total-count');
const topCategoryEl = document.getElementById('top-category');
const filterButtons = document.querySelectorAll('.filter-btn');
const resetBtn = document.getElementById('reset-demo-btn');

// --- Initialization ---
function init() {
  // Set default date input to today
  dateInput.value = new Date().toISOString().split('T')[0];

  // Render initial view
  render();

  // Attach Event Listeners
  form.addEventListener('submit', handleAddExpense);
  filterButtons.forEach(btn => btn.addEventListener('click', handleFilterChange));
  resetBtn.addEventListener('click', handleResetDemo);
}

// --- LocalStorage Helpers ---
function loadExpenses() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error('Error parsing localStorage:', e);
    }
  }
  // If no data exists, seed default sample data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EXPENSES));
  return DEFAULT_EXPENSES;
}

function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

// --- Add New Expense Handler ---
function handleAddExpense(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;
  const category = categorySelect.value;

  if (!title || isNaN(amount) || amount <= 0 || !date) {
    alert('Please fill out all fields with valid information.');
    return;
  }

  const newExpense = {
    id: Date.now().toString(),
    title,
    amount: Math.round(amount * 100) / 100,
    category,
    date,
  };

  // Prepend new expense
  expenses.unshift(newExpense);
  saveExpenses();
  render();

  // Reset form inputs
  titleInput.value = '';
  amountInput.value = '';
  dateInput.value = new Date().toISOString().split('T')[0];
  titleInput.focus();
}

// --- Delete Expense Handler ---
function handleDeleteExpense(id) {
  expenses = expenses.filter(item => item.id !== id);
  saveExpenses();
  render();
}

// --- Category Filter Handler ---
function handleFilterChange(e) {
  filterButtons.forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  currentFilter = e.target.getAttribute('data-category');
  renderList();
}

// --- Reset to Demo Data ---
function handleResetDemo() {
  if (confirm('Reset transactions to the original demo sample data?')) {
    expenses = [...DEFAULT_EXPENSES];
    saveExpenses();
    render();
  }
}

// --- Calculation & Statistics ---
function updateStats() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  totalSpentEl.textContent = \`$\${total.toFixed(2)}\`;
  totalCountEl.textContent = expenses.length;

  // Calculate highest spending category
  if (expenses.length === 0) {
    topCategoryEl.textContent = '—';
    return;
  }

  const categoryTotals = {};
  expenses.forEach(item => {
    categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
  });

  let maxCat = '';
  let maxAmount = -1;
  for (const [cat, amt] of Object.entries(categoryTotals)) {
    if (amt > maxAmount) {
      maxAmount = amt;
      maxCat = cat;
    }
  }

  topCategoryEl.textContent = maxCat || '—';
}

// --- Render Transaction List ---
function renderList() {
  expenseList.innerHTML = '';

  const filtered = currentFilter === 'All'
    ? expenses
    : expenses.filter(item => item.category === currentFilter);

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');

    filtered.forEach(item => {
      const li = document.createElement('li');
      li.className = 'expense-item';

      li.innerHTML = \`
        <div class="expense-info">
          <h4>\${escapeHtml(item.title)}</h4>
          <p class="expense-meta">\${item.category} · \${item.date}</p>
        </div>
        <div class="expense-actions">
          <span class="expense-amount">$\${item.amount.toFixed(2)}</span>
          <button class="delete-btn" title="Delete expense" data-id="\${item.id}">🗑️</button>
        </div>
      \`;

      // Attach delete click listener
      const deleteBtn = li.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => handleDeleteExpense(item.id));

      expenseList.appendChild(li);
    });
  }
}

// Utility to escape HTML to prevent XSS
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Full Render
function render() {
  updateStats();
  renderList();
}

// Run on load
document.addEventListener('DOMContentLoaded', init);`,
  };

  const copyCode = () => {
    navigator.clipboard.writeText(fileCode[selectedFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro banner */}
      <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-purple-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Personal Expense Tracker Architecture
            </h2>
            <p className="text-sm text-slate-700 mt-1">
              As requested in your prompt, here is the clean, beginner-friendly separation into HTML, CSS, and JavaScript.
              You can toggle between the files below, read how each one works, and copy the full working code!
            </p>
          </div>
        </div>
      </div>

      {/* File selector tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
          {(['html', 'css', 'js'] as const).map(file => (
            <button
              key={file}
              onClick={() => setSelectedFile(file)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-2 ${
                selectedFile === file
                  ? 'bg-white text-purple-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileCode className="w-4 h-4" />
              <span>{fileExplanations[file].name}</span>
            </button>
          ))}
        </div>

        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 text-white transition-colors shadow-xs"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied {fileExplanations[selectedFile].name}!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy {fileExplanations[selectedFile].name}</span>
            </>
          )}
        </button>
      </div>

      {/* Explanation card */}
      <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-base font-bold text-slate-900">
            {fileExplanations[selectedFile].name}
          </h3>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-purple-100 text-purple-800">
            {fileExplanations[selectedFile].badge}
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {fileExplanations[selectedFile].description}
        </p>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-semibold text-slate-800 mb-2 uppercase tracking-wider">
            Key Concepts & Implementation Highlights:
          </h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
            {fileExplanations[selectedFile].keyConcepts.map((concept, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-purple-600 font-bold">✓</span>
                <span className="font-mono text-[11px] leading-snug">{concept}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Code Display */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-lg">
        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="font-mono font-medium text-slate-200 ml-2">
              {fileExplanations[selectedFile].name}
            </span>
          </div>
          <span className="text-slate-500 font-mono">
            {fileCode[selectedFile].split('\n').length} lines
          </span>
        </div>
        <pre className="p-5 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed max-h-[540px] scrollbar-thin">
          <code>{fileCode[selectedFile]}</code>
        </pre>
      </div>
    </div>
  );
};
