import { useState } from "react";
import API from "../api";

export default function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = isRegister ? "/register" : "/login";

      const res = await API.post(url, form);

      setMessage(res.data.message);

      if (!isRegister) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        onLogin(res.data.user);
      } else {
        setIsRegister(false);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-box">
      <h2>{isRegister ? "Register" : "Login"}</h2>

      {isRegister && (
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
      )}

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {isRegister ? "Register" : "Login"}
      </button>

      <p>{message}</p>

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have account? Login" : "New user? Register"}
      </button>
    </div>
  );
}