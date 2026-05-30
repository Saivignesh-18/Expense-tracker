import { useState } from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import Dashboard from "./components/Dashboard";
import AddExpenseModal from "./components/AddExpenseModal";
import Header from "./components/Header";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <ExpenseProvider>
      <div className="app">
        <Header onAdd={() => setShowModal(true)} />
        <Dashboard />
        {showModal && <AddExpenseModal onClose={() => setShowModal(false)} />}
      </div>
    </ExpenseProvider>
  );
}
