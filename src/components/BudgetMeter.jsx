import { useExpense } from "../context/ExpenseContext";
import { formatCurrency } from "../utils/format";

export default function BudgetMeter() {
  const { totalSpent, state, percentUsed, byCategory } = useExpense();

  const getColor = (pct) => {
    if (pct >= 90) return "#FF3B3B";
    if (pct >= 70) return "#FFB347";
    return "#4ECDC4";
  };

  return (
    <div className="budget-meter card-panel">
      <h3 className="panel-title">Budget Overview</h3>
      <div className="meter-wrap">
        <div className="meter-bar">
          {byCategory.map((cat) => {
            const width = (cat.total / state.budget) * 100;
            return (
              <div
                key={cat.key}
                className="meter-segment"
                style={{ width: `${width}%`, background: cat.color }}
                title={`${cat.label}: ₹${cat.total}`}
              />
            );
          })}
        </div>
        <div className="meter-labels">
          <span>₹0</span>
          <span style={{ color: getColor(percentUsed) }}>{percentUsed.toFixed(0)}% used</span>
          <span>{formatCurrency(state.budget)}</span>
        </div>
      </div>
      <div className="meter-legend">
        {byCategory.map((cat) => (
          <div className="legend-item" key={cat.key}>
            <span className="legend-dot" style={{ background: cat.color }} />
            <span>{cat.icon} {cat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
