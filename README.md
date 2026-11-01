# SpendWise – Personal Expense Tracker

SpendWise is a modern and user-friendly personal expense tracker designed to help users manage their daily spending, organize transactions, and understand their spending habits.

The application provides a clean dashboard with expense summaries, category breakdowns, and transaction management, all within a simple and responsive interface.

## Features

- **Dashboard Overview:** View spending statistics and expense summaries.
- **Add Expenses:** Record expenses with a title, amount, category, and date.
- **Transaction Management:** View and delete recorded expenses.
- **Undo Delete:** Restore an expense after deleting it.
- **Category Breakdown:** Visualize expenses organized by category.
- **Currency Selection:** Choose your preferred currency.
- **Local Storage:** Automatically save expenses in the browser so they remain available after refreshing the page.
- **Demo Data Reset:** Restore the original sample transactions.
- **Source Code Viewer:** Explore the project's code and component structure.
- **Responsive Design:** Enjoy a clean interface on desktop and mobile devices.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Browser LocalStorage

## Project Structure

```text
SpendWise/
│
├── src/
│   ├── components/
│   │   ├── CategoryBreakdown.tsx
│   │   ├── ExpenseForm.tsx
│   │   ├── ExpenseList.tsx
│   │   ├── Header.tsx
│   │   ├── SourceCodeViewer.tsx
│   │   └── StatCards.tsx
│   │
│   ├── constants/
│   │   └── categories.ts
│   │
│   ├── types/
│   │   └── expense.ts
│   │
│   ├── utils/
│   │   └── storage.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── vanilla-version/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

Follow these steps to run SpendWise locally.

### 1. Clone the repository

```bash
git clone https://github.com/Jerrymesfin/SpendWise-Tracker.git
```

### 2. Navigate to the project folder

```bash
cd SpendWise-Tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Open the local URL displayed in your terminal (usually `http://localhost:3000`).

## Data Storage

SpendWise uses browser LocalStorage to store expenses and currency preferences.

No external database or backend is required. Your saved data stays in the browser where you created it.

## Design

SpendWise features a clean and modern dashboard with:

- Soft purple and white color palette.
- Minimal and intuitive layout.
- Rounded cards and modern typography.
- Clear expense summaries and category visualizations.

## Future Improvements

- Monthly and yearly spending reports.
- Expense editing functionality.
- Budget planning and spending limits.
- Data export to CSV or PDF.
- Charts for tracking spending trends.

## Author

**Eyerusalem Mesfin Desta**

GitHub: [@Jerrymesfin](https://github.com/Jerrymesfin)

---

*SpendWise – Track Your Spending, Manage Your Money, Spend Wisely.*
