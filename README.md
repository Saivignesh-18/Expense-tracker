# ◈ SPENT — Smart Expense Tracker

A component-based expense tracker built with React + Vite, featuring a dark editorial UI with INR currency support.

---

## 🗂️ Project Structure

```
src/
├── App.jsx                      # Root component, modal state
├── App.css                      # All global styles + responsive rules
├── main.jsx                     # React DOM entry point
│
├── context/
│   └── ExpenseContext.jsx       # Global state via useReducer + Context API
│
├── components/
│   ├── Dashboard.jsx            # Layout orchestrator
│   ├── Header.jsx               # Logo, budget input, Add button
│   ├── SummaryCards.jsx         # 4 KPI cards (spent, remaining, avg, count)
│   ├── BudgetMeter.jsx          # Segmented bar + legend
│   ├── CategoryBreakdown.jsx    # Per-category bar cards (clickable filter)
│   ├── FilterBar.jsx            # Category pill filters
│   ├── ExpenseList.jsx          # Filtered list container
│   ├── ExpenseItem.jsx          # Single expense row
│   └── AddExpenseModal.jsx      # Add expense form modal
│
└── utils/
    └── format.js                # formatCurrency (INR) + formatDate helpers
```

---

## ⚡ Setup & Run

```bash
npm install
npm run dev
```

---

## 🧩 Features

| Feature | Details |
|---|---|
| Global State | `useReducer` + React Context (no external library) |
| Add Expenses | Modal with title, amount, category, date, note |
| Delete Expenses | Per-row delete button |
| Category Filter | Filter bar + clickable category cards |
| Budget Tracking | Editable monthly budget, segmented meter bar |
| Summary Cards | Total spent, remaining, daily avg, transaction count |
| Responsive | 3-tier breakpoints: desktop / tablet / mobile |
| Currency | INR formatting via `Intl.NumberFormat` |
| Animations | Slide-in on add, hover lifts, modal fade |

---

## 🎨 Design Choices

- **Font**: Syne (display, 800 weight) + DM Mono (numbers/labels)
- **Theme**: Dark editorial — `#0e0e10` base, teal accent `#4ECDC4`
- **Colors per category**: Each category has its own accent color used consistently in meter, cards, and list rows
- **No external UI library**: Pure CSS, zero dependencies beyond React

---

## 🔌 State Actions

| Action Type | Payload |
|---|---|
| `ADD_EXPENSE` | `{ title, amount, category, date, note }` |
| `DELETE_EXPENSE` | expense `id` |
| `SET_BUDGET` | number |
| `SET_FILTER` | category key or `"all"` |
