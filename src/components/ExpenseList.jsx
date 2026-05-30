import { useExpense } from "../context/ExpenseContext";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList() {
  const { filteredExpenses } = useExpense();

  if (filteredExpenses.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-icon">◈</p>
        <p>No expenses found for this category.</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {filteredExpenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
}
