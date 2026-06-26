import { useState } from "react";
import { useExpense, CATEGORIES } from "../context/ExpenseContext";

const today = new Date().toISOString().split("T")[0];

export default function AddExpenseModal({ onClose }) {
  const { addExpense } = useExpense();
  const [form, setForm] = useState({ title: "", amount: "", category: "food", date: today, note: "" });
  const [error, setError] = useState("");

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async () => {
  if (!form.title.trim()) return setError("Title is required.");
  if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
    return setError("Enter a valid amount.");

  await addExpense({
    ...form,
    amount: Number(form.amount),
  });

  onClose();
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Expense</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <p className="modal-error">{error}</p>}

        <div className="form-group">
          <label>Title</label>
          <input placeholder="What did you spend on?" value={form.title} onChange={set("title")} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount (₹)</label>
            <input type="number" placeholder="0.00" value={form.amount} onChange={set("amount")} />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input type="date" value={form.date} onChange={set("date")} />
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <div className="cat-select">
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                className={`cat-option ${form.category === key ? "selected" : ""}`}
                style={{ "--c": cat.color }}
                onClick={() => setForm({ ...form, category: key })}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>Note (optional)</label>
          <input placeholder="Any additional details..." value={form.note} onChange={set("note")} />
        </div>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-submit" onClick={handleSubmit}>Add Expense</button>
        </div>
      </div>
    </div>
  );
}
