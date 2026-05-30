import { useExpense } from "../context/ExpenseContext";
import { formatCurrency } from "../utils/format";

export default function CategoryBreakdown() {
  const { byCategory, totalSpent, dispatch } = useExpense();

  const sorted = [...byCategory].sort((a, b) => b.total - a.total);

  return (
    <div className="category-breakdown card-panel">
      <h3 className="panel-title">Spending by Category</h3>
      <div className="category-grid">
        {sorted.map((cat) => {
          const pct = totalSpent > 0 ? (cat.total / totalSpent) * 100 : 0;
          return (
            <div
              className="cat-card"
              key={cat.key}
              style={{ "--cat-color": cat.color }}
              onClick={() => dispatch({ type: "SET_FILTER", payload: cat.key })}
            >
              <div className="cat-icon">{cat.icon}</div>
              <div className="cat-bar-wrap">
                <div className="cat-bar" style={{ width: `${pct}%`, background: cat.color }} />
              </div>
              <div className="cat-info">
                <span className="cat-label">{cat.label}</span>
                <span className="cat-amount">{formatCurrency(cat.total)}</span>
              </div>
              <span className="cat-pct">{pct.toFixed(0)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
