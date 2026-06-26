import { useState, useEffect } from "react";
import { useExpense } from "../context/ExpenseContext";

export default function Header({ onAdd, onLogout }) {
  const { state, dispatch } = useExpense();
  const [localBudget, setLocalBudget] = useState(state.budget);

  // Keep local in sync if budget changes externally
  useEffect(() => {
    setLocalBudget(state.budget);
  }, [state.budget]);

  const handleBudgetBlur = () => {
    const parsed = Number(localBudget);
    if (!isNaN(parsed) && parsed > 0) {
      dispatch({ type: "SET_BUDGET", payload: parsed });
    } else {
      // Reset to last valid value
      setLocalBudget(state.budget);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.target.blur();
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">SPENT</span>
        </div>
        <p className="header-sub">Smart Expense Tracker</p>
      </div>
      <div className="header-right">
        <div className="budget-setter">
          <label>Monthly Budget ₹</label>
          <input
            type="number"
            value={localBudget}
            onChange={(e) => setLocalBudget(e.target.value)}
            onBlur={handleBudgetBlur}
            onKeyDown={handleKeyDown}
            className="budget-input"
          />
        </div>
        <button className="add-btn" onClick={onAdd}>
          <span>+</span> Add Expense
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

