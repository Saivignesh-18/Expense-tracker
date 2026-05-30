import { createContext, useContext, useReducer } from "react";

const ExpenseContext = createContext();

const CATEGORIES = {
  food: { label: "Food & Dining", icon: "🍜", color: "#FF6B6B" },
  transport: { label: "Transport", icon: "🚗", color: "#4ECDC4" },
  shopping: { label: "Shopping", icon: "🛍️", color: "#FFE66D" },
  health: { label: "Health", icon: "💊", color: "#A8E6CF" },
  entertainment: { label: "Entertainment", icon: "🎬", color: "#C3A6FF" },
  utilities: { label: "Utilities", icon: "⚡", color: "#FFB347" },
  other: { label: "Other", icon: "📦", color: "#B0B0B0" },
};

const initialState = {
  expenses: [
    { id: 1, title: "Lunch at Café", amount: 450, category: "food", date: "2026-05-28", note: "Team lunch" },
    { id: 2, title: "Uber ride", amount: 180, category: "transport", date: "2026-05-27", note: "" },
    { id: 3, title: "Netflix subscription", amount: 649, category: "entertainment", date: "2026-05-26", note: "Monthly" },
    { id: 4, title: "Grocery run", amount: 1250, category: "food", date: "2026-05-25", note: "Big Bazaar" },
    { id: 5, title: "Electricity bill", amount: 2100, category: "utilities", date: "2026-05-24", note: "May bill" },
    { id: 6, title: "Gym membership", amount: 1500, category: "health", date: "2026-05-23", note: "" },
    { id: 7, title: "New headphones", amount: 3499, category: "shopping", date: "2026-05-22", note: "Sony WH-1000XM5" },
    { id: 8, title: "Doctor visit", amount: 600, category: "health", date: "2026-05-20", note: "General checkup" },
  ],
  budget: 15000,
  filter: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [{ ...action.payload, id: Date.now() }, ...state.expenses] };
    case "DELETE_EXPENSE":
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload) };
    case "SET_BUDGET":
      return { ...state, budget: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalSpent = state.expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = state.budget - totalSpent;
  const percentUsed = Math.min((totalSpent / state.budget) * 100, 100);

  const byCategory = Object.keys(CATEGORIES).map((key) => ({
    key,
    ...CATEGORIES[key],
    total: state.expenses.filter((e) => e.category === key).reduce((s, e) => s + e.amount, 0),
  })).filter((c) => c.total > 0);

  const filteredExpenses =
    state.filter === "all" ? state.expenses : state.expenses.filter((e) => e.category === state.filter);

  return (
    <ExpenseContext.Provider value={{ state, dispatch, totalSpent, remaining, percentUsed, byCategory, filteredExpenses, CATEGORIES }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpense = () => useContext(ExpenseContext);
export { CATEGORIES };
