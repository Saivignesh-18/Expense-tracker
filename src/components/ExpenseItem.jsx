import { useExpense, CATEGORIES } from "../context/ExpenseContext";
import { formatCurrency, formatDate } from "../utils/format";

export default function ExpenseItem({ expense }) {
  const { dispatch } = useExpense();
  const cat = CATEGORIES[expense.category];

  return (
    <div className="expense-item" style={{ "--cat-color": cat.color }}>
      <div className="expense-icon" style={{ background: cat.color + "22", color: cat.color }}>
        {cat.icon}
      </div>
      <div className="expense-body">
        <p className="expense-title">{expense.title}</p>
        {expense.note && <p className="expense-note">{expense.note}</p>}
      </div>
      <div className="expense-meta">
        <span className="expense-date">{formatDate(expense.date)}</span>
        <span className="expense-cat" style={{ color: cat.color }}>{cat.label}</span>
      </div>
      <div className="expense-amount">
        <span>{formatCurrency(expense.amount)}</span>
      </div>
      <button
        className="delete-btn"
        onClick={() => dispatch({ type: "DELETE_EXPENSE", payload: expense.id })}
        title="Delete"
      >
        ✕
      </button>
    </div>
  );
}
