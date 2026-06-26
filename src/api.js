import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-2-qfdt.onrender.com",
});

export default API;