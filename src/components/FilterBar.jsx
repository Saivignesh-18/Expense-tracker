import { useExpense, CATEGORIES } from "../context/ExpenseContext";

export default function FilterBar() {
  const { state, dispatch } = useExpense();

  const filters = [{ key: "all", label: "All", icon: "◈" }, ...Object.entries(CATEGORIES).map(([key, val]) => ({ key, ...val }))];

  return (
    <div className="filter-bar">
      {filters.map((f) => (
        <button
          key={f.key}
          className={`filter-btn ${state.filter === f.key ? "active" : ""}`}
          onClick={() => dispatch({ type: "SET_FILTER", payload: f.key })}
        >
          <span>{f.icon}</span> {f.label}
        </button>
      ))}
    </div>
  );
}
