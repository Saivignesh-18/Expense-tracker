import { useState } from "react";
import { ExpenseProvider } from "./context/ExpenseContext";
import Dashboard from "./components/Dashboard";
import AddExpenseModal from "./components/AddExpenseModal";
import Header from "./components/Header";
import Auth from "./components/Auth";
import "./App.css";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!user) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <ExpenseProvider>
      <div className="app">
        <Header onAdd={() => setShowModal(true)} onLogout={logout} />
        <Dashboard />
        {showModal && <AddExpenseModal onClose={() => setShowModal(false)} />}
      </div>
    </ExpenseProvider>
  );
}