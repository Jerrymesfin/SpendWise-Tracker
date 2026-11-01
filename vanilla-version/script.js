/**
 * SPENDWISE - PERSONAL EXPENSE TRACKER
 * Vanilla JavaScript implementation
 * 
 * Responsibilities:
 * 1. LocalStorage Persistence
 * 2. Form validation and adding new expenses
 * 3. Rendering expenses list and applying category filters
 * 4. Calculating totals, averages, and expense counts
 * 5. Deleting expenses with immediate UI and storage updates
 */

// LocalStorage key
const STORAGE_KEY = 'spendwise_expenses_data';

// Sample default expenses for initial demonstration
const DEFAULT_EXPENSES = [
  { id: '1', title: 'Weekly Groceries', amount: 54.80, category: 'Food', date: '2026-10-31' },
  { id: '2', title: 'Metro Transit Card', amount: 25.00, category: 'Transport', date: '2026-10-30' },
  { id: '3', title: 'Winter Fleece Jacket', amount: 68.50, category: 'Shopping', date: '2026-10-29' },
  { id: '4', title: 'High-speed Internet', amount: 45.00, category: 'Other', date: '2026-10-28' },
  { id: '5', title: 'Artisan Latte & Snack', amount: 6.80, category: 'Food', date: '2026-10-27' }
];

// Category Icons Mapping
const CATEGORY_ICONS = {
  Food: '🍽️',
  Transport: '🚗',
  Shopping: '🛍️',
  Other: '📦'
};

// Application State
let expenses = loadExpensesFromStorage();
let activeCategory = 'All';
let searchTerm = '';

// DOM Elements
const form = document.getElementById('expense-form');
const titleInput = document.getElementById('expense-title');
const amountInput = document.getElementById('expense-amount');
const dateInput = document.getElementById('expense-date');
const categorySelect = document.getElementById('expense-category');
const formError = document.getElementById('form-error');

const expenseList = document.getElementById('expense-list');
const emptyState = document.getElementById('empty-state');
const totalSpentEl = document.getElementById('total-spent');
const totalCountEl = document.getElementById('total-count');
const averageSpentEl = document.getElementById('average-spent');
const topCategoryEl = document.getElementById('top-category');

const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const resetBtn = document.getElementById('reset-demo-btn');
const exportCsvBtn = document.getElementById('export-csv-btn');
const quickChips = document.querySelectorAll('.chip-btn');

/**
 * Initialize application: set date, attach listeners, and render data
 */
function init() {
  // Set default date to today in YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  dateInput.value = today;
  dateInput.max = today;

  // Attach event listeners
  form.addEventListener('submit', handleFormSubmit);
  resetBtn.addEventListener('click', handleResetDemo);
  if (exportCsvBtn) exportCsvBtn.addEventListener('click', handleExportCSV);
  if (searchInput) searchInput.addEventListener('input', handleSearch);

  // Category filter button listeners
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      render();
    });
  });

  // Quick suggestion chips listeners
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      titleInput.value = chip.getAttribute('data-preset');
      categorySelect.value = chip.getAttribute('data-cat');
      titleInput.focus();
    });
  });

  // First render
  render();
}

/**
 * Read expenses array from browser LocalStorage
 */
function loadExpensesFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Seed default items on first session
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_EXPENSES));
      return DEFAULT_EXPENSES;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : DEFAULT_EXPENSES;
  } catch (err) {
    console.error('Error reading localStorage:', err);
    return DEFAULT_EXPENSES;
  }
}

/**
 * Save current expenses array to LocalStorage
 */
function saveExpensesToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (err) {
    console.error('Error saving to localStorage:', err);
  }
}

/**
 * Handle new expense submission
 */
function handleFormSubmit(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const date = dateInput.value;
  const category = categorySelect.value;

  // Validation
  if (!title) {
    showError('Please enter a descriptive expense title.');
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    showError('Please enter a valid amount greater than $0.00.');
    return;
  }
  if (!date) {
    showError('Please choose a valid date.');
    return;
  }

  // Clear any existing error
  hideError();

  // Create new expense object
  const newExpense = {
    id: Date.now().toString(),
    title: title,
    amount: Math.round(amount * 100) / 100,
    category: category,
    date: date
  };

  // Prepend to top of list
  expenses.unshift(newExpense);
  saveExpensesToStorage();

  // Clear inputs
  titleInput.value = '';
  amountInput.value = '';
  dateInput.value = new Date().toISOString().split('T')[0];

  render();
}

/**
 * Delete an expense by ID
 */
function deleteExpense(id) {
  expenses = expenses.filter(item => item.id !== id);
  saveExpensesToStorage();
  render();
}

/**
 * Reset expenses to sample demo data
 */
function handleResetDemo() {
  if (confirm('Reset your transaction list to the default demo expenses?')) {
    expenses = [...DEFAULT_EXPENSES];
    saveExpensesToStorage();
    render();
  }
}

/**
 * Filter list based on live search query
 */
function handleSearch(e) {
  searchTerm = e.target.value.toLowerCase().trim();
  renderList();
}

/**
 * Export current expenses as a CSV file
 */
function handleExportCSV() {
  if (expenses.length === 0) {
    alert('No expenses to export.');
    return;
  }
  const headers = ['Title,Amount,Category,Date'];
  const rows = expenses.map(e => '"' + e.title.replace(/"/g, '""') + '",' + e.amount.toFixed(2) + ',' + e.category + ',' + e.date);
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'spendwise_expenses.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Show validation error
 */
function showError(message) {
  formError.textContent = message;
  formError.classList.remove('hidden');
}

/**
 * Hide validation error
 */
function hideError() {
  formError.textContent = '';
  formError.classList.add('hidden');
}

/**
 * Update summary cards: Total Spent, Total Count, Average, Top Category
 */
function updateSummary() {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const count = expenses.length;
  const avg = count > 0 ? total / count : 0;

  totalSpentEl.textContent = '$' + total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  totalCountEl.textContent = count.toString();
  averageSpentEl.textContent = '$' + avg.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Calculate top spending category
  if (count === 0) {
    topCategoryEl.textContent = '—';
  } else {
    const categoryTotals = {};
    expenses.forEach(item => {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    });

    let topCat = '—';
    let maxSpent = -1;
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > maxSpent) {
        maxSpent = amt;
        topCat = cat;
      }
    }
    topCategoryEl.textContent = topCat;
  }

  // Update category badge counts in filter buttons
  updateFilterCounts();
}

/**
 * Update number counts inside category filter buttons
 */
function updateFilterCounts() {
  const countAll = document.getElementById('count-all');
  const countFood = document.getElementById('count-food');
  const countTransport = document.getElementById('count-transport');
  const countShopping = document.getElementById('count-shopping');
  const countOther = document.getElementById('count-other');

  if (countAll) countAll.textContent = expenses.length.toString();
  if (countFood) countFood.textContent = expenses.filter(e => e.category === 'Food').length.toString();
  if (countTransport) countTransport.textContent = expenses.filter(e => e.category === 'Transport').length.toString();
  if (countShopping) countShopping.textContent = expenses.filter(e => e.category === 'Shopping').length.toString();
  if (countOther) countOther.textContent = expenses.filter(e => e.category === 'Other').length.toString();
}

/**
 * Render the expense list based on active category & search
 */
function renderList() {
  expenseList.innerHTML = '';

  let filtered = activeCategory === 'All'
    ? expenses
    : expenses.filter(item => item.category === activeCategory);

  if (searchTerm) {
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.amount.toString().includes(searchTerm)
    );
  }

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');

    filtered.forEach(item => {
      const li = document.createElement('li');
      li.className = 'expense-item';

      const icon = CATEGORY_ICONS[item.category] || '💰';

      li.innerHTML = 
        '<div class="expense-left">' +
          '<div class="category-icon cat-' + item.category + '">' +
            icon +
          '</div>' +
          '<div class="expense-details">' +
            '<h4>' + escapeHtml(item.title) + '</h4>' +
            '<p class="expense-meta">' +
              item.category + ' · ' + item.date +
            '</p>' +
          '</div>' +
        '</div>' +
        '<div class="expense-right">' +
          '<span class="expense-amount">$' + item.amount.toFixed(2) + '</span>' +
          '<button class="delete-btn" title="Delete expense" aria-label="Delete ' + escapeHtml(item.title) + '">' +
            '🗑️' +
          '</button>' +
        '</div>';

      // Attach delete click listener
      const deleteBtn = li.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        if (confirm('Delete "' + item.title + '" ($' + item.amount.toFixed(2) + ')?')) {
          deleteExpense(item.id);
        }
      });

      expenseList.appendChild(li);
    });
  }
}

/**
 * Prevent XSS injection in user-entered titles
 */
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Full page re-render
 */
function render() {
  updateSummary();
  renderList();
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', init);
