# Personal Expense Tracker (HTML, CSS, JavaScript)

A simple, modern, beginner-friendly web application to log personal expenses, filter by categories, calculate totals, and store data in your browser's `localStorage`.

---

## 📁 File Structure & Purpose of Each File

| File Name | Technology | Purpose & Responsibility |
| :--- | :--- | :--- |
| **`index.html`** | HTML5 | **Markup & Semantic Structure**: Provides the skeleton of the application including the top header, summary statistics cards, expense input form (title, amount, date, category), category filter buttons, and transaction list container. |
| **`style.css`** | CSS3 | **Styling & Responsive Layout**: Implements the clean, soft purple and white aesthetic (`#7c3aed`, `#f8f7fc`, `#ffffff`). Uses CSS variables, responsive CSS Grid and Flexbox, modern rounded corners (`border-radius: 16px`), zero-pill metadata typography, and mobile-friendly media queries. |
| **`script.js`** | JavaScript (ES6) | **Application Logic & Storage**: Handles DOM manipulation and user events. Validates user input, saves and loads expenses to/from browser `localStorage`, calculates total spending and counts dynamically, filters transactions by category, and deletes expenses. |

---

## 🚀 Features Implemented

1. **Add a new expense**: Enter title, amount, category (Food, Transport, Shopping, Other), and date.
2. **Transaction list**: Live list displaying all logged transactions with icons and dates.
3. **Total amount spent**: Dynamic sum updated automatically whenever expenses are added or removed.
4. **Number of expenses**: Live counter showing the total number of transactions.
5. **Delete expense**: Remove any transaction with instant UI and LocalStorage update.
6. **Category filters**: Quick-filter buttons for `All`, `Food`, `Transport`, `Shopping`, and `Other`.
7. **LocalStorage persistence**: All data stays intact even if you reload or close the browser tab.

---

## 💻 How to Run

1. Open `index.html` in any web browser (double-click it or right-click > "Open with Chrome / Firefox / Safari / Edge").
2. No servers, node modules, or build steps required for the vanilla version.
