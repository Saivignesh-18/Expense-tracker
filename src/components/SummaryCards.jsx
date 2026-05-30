import { useExpense } from "../context/ExpenseContext";
import { formatCurrency } from "../utils/format";

export default function SummaryCards() {
  const { totalSpent, remaining, state } = useExpense();
  const avgDaily = totalSpent / 30;
  const isOverBudget = remaining < 0;

  const cards = [
    {
      label: "Total Spent",
      value: formatCurrency(totalSpent),
      sub: "This month",
      accent: "#FF6B6B",
      icon: "↑",
    },
    {
      label: isOverBudget ? "Over Budget" : "Remaining",
      value: formatCurrency(Math.abs(remaining)),
      sub: isOverBudget ? "Exceeded limit!" : "Available to spend",
      accent: isOverBudget ? "#FF3B3B" : "#4ECDC4",
      icon: isOverBudget ? "⚠" : "✓",
    },
    {
      label: "Daily Average",
      value: formatCurrency(avgDaily),
      sub: "Per day this month",
      accent: "#C3A6FF",
      icon: "≈",
    },
    {
      label: "Transactions",
      value: state.expenses.length,
      sub: "Total entries",
      accent: "#FFB347",
      icon: "#",
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, i) => (
        <div className="card" key={i} style={{ "--accent": card.accent }}>
          <div className="card-icon">{card.icon}</div>
          <div className="card-body">
            <p className="card-label">{card.label}</p>
            <p className="card-value">{card.value}</p>
            <p className="card-sub">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
