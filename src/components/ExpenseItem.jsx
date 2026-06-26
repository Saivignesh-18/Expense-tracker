import { useState } from "react";
import { useExpense, CATEGORIES } from "../context/ExpenseContext";
import { formatCurrency, formatDate } from "../utils/format";

export default function ExpenseItem({ expense }) {
  const { deleteExpense, updateExpense } = useExpense();
  const [isEditing, setIsEditing] = useState(false);

  const cat = CATEGORIES[expense.category] || CATEGORIES.other;

  const [form, setForm] = useState({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
  });

  const handleUpdate = async () => {
    await updateExpense(expense.id, {
      title: form.title,
      amount: Number(form.amount),
      category: form.category,
    });

    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="expense-item">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {Object.keys(CATEGORIES).map((key) => (
            <option key={key} value={key}>
              {CATEGORIES[key].label}
            </option>
          ))}
        </select>

        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="expense-item" style={{ "--cat-color": cat.color }}>
      <div
        className="expense-icon"
        style={{ background: cat.color + "22", color: cat.color }}
      >
        {cat.icon}
      </div>

      <div className="expense-body">
        <p className="expense-title">{expense.title}</p>
        {expense.note && <p className="expense-note">{expense.note}</p>}
      </div>

      <div className="expense-meta">
        <span className="expense-date">{formatDate(expense.date)}</span>
        <span className="expense-cat" style={{ color: cat.color }}>
          {cat.label}
        </span>
      </div>

      <div className="expense-amount">
        <span>{formatCurrency(expense.amount)}</span>
      </div>

      <button className="delete-btn" onClick={() => setIsEditing(true)}>
        Edit
      </button>

      <button
        className="delete-btn"
        onClick={() => deleteExpense(expense.id)}
        title="Delete"
      >
        ✕
      </button>
    </div>
  );
}