import { createContext, useContext, useReducer, useEffect } from "react";
import API from "../api";

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
  expenses: [],
  budget: Number(localStorage.getItem("budget")) || 15000,
  filter: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };

    case "ADD_EXPENSE":
      return { ...state, expenses: [action.payload, ...state.expenses] };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
      };

    case "UPDATE_EXPENSE":
      return {...state,expenses: state.expenses.map((e) =>e.id === action.payload.id ? action.payload : e),};

    case "SET_BUDGET":
      localStorage.setItem("budget", action.payload);
      return { ...state, budget: Number(action.payload) };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  API.get(`/expenses?user_id=${user.id}`)
    .then((res) => {
      dispatch({ type: "SET_EXPENSES", payload: res.data });
    })
    .catch((err) => console.log(err));
}, []);

  const addExpense = async (expense) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const res = await API.post("/expenses", {
    ...expense,
    user_id: user.id,
  });

  dispatch({
    type: "ADD_EXPENSE",
    payload: res.data.expense,
  });
};

  const deleteExpense = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));

  await API.delete(`/expenses/${id}?user_id=${user.id}`);

  dispatch({
    type: "DELETE_EXPENSE",
    payload: id,
  });
};

  const updateExpense = async (id, updatedExpense) => {
  const res = await API.put(`/expenses/${id}`, updatedExpense);

  dispatch({
    type: "UPDATE_EXPENSE",
    payload: res.data.expense,
  });
};

  const totalSpent = state.expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const remaining = state.budget - totalSpent;
  const percentUsed = Math.min((totalSpent / state.budget) * 100, 100);

  const byCategory = Object.keys(CATEGORIES)
    .map((key) => ({
      key,
      ...CATEGORIES[key],
      total: state.expenses
        .filter((e) => e.category === key)
        .reduce((s, e) => s + Number(e.amount), 0),
    }))
    .filter((c) => c.total > 0);

  const filteredExpenses =
    state.filter === "all"
      ? state.expenses
      : state.expenses.filter((e) => e.category === state.filter);

  return (
    <ExpenseContext.Provider
    value={{
  state,
  dispatch,
  addExpense,
  deleteExpense,
  updateExpense,
  totalSpent,
  remaining,
  percentUsed,
  byCategory,
  filteredExpenses,
  CATEGORIES,
}}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export const useExpense = () => useContext(ExpenseContext);
export { CATEGORIES };