import SummaryCards from "./SummaryCards";
import CategoryBreakdown from "./CategoryBreakdown";
import BudgetMeter from "./BudgetMeter";
import ExpenseList from "./ExpenseList";
import FilterBar from "./FilterBar";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <section className="top-section">
        <SummaryCards />
        <BudgetMeter />
      </section>
      <section className="mid-section">
        <CategoryBreakdown />
      </section>
      <section className="bottom-section">
        <FilterBar />
        <ExpenseList />
      </section>
    </main>
  );
}
