# 💰 Smart Expense Tracker

A full-stack Expense Tracker application built using **React**, **Flask**, and **SQLite**. The application allows users to register, log in securely, and manage their personal expenses with complete CRUD functionality.

---

## 🌐 Live Demo

### Frontend
https://expense-tracker-six-zeta-50.vercel.app/

### Backend API
https://expense-tracker-2-qfdt.onrender.com

---

## ✨ Features

- 🔐 User Registration & Login
- 🔒 Secure Password Hashing
- ➕ Add New Expenses
- ✏️ Update Existing Expenses
- 🗑️ Delete Expenses
- 👤 User-specific Expense Management
- 💰 Monthly Budget Management
- 📅 Expense Date Tracking
- 📝 Notes for Expenses
- 📂 Category-wise Expense Tracking
- ⚡ REST API using Flask
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML5
- CSS3
- Axios

### Backend
- Flask
- Flask SQLAlchemy
- Flask CORS
- SQLite
- Werkzeug

---

## 📂 Project Structure

```
expense-tracker
│
├── src/
│   ├── components/
│   ├── context/
│   ├── utils/
│   ├── api.js
│   └── App.jsx
│
├── app.py
├── requirements.txt
├── Procfile
├── package.json
└── README.md
```

---

## 🚀 Installation

### Clone the Repository

git clone https://github.com/Saivignesh-18/Expense-tracker


Move into the project directory

```bash
cd expense-tracker
```

---

## Backend Setup

Install dependencies

```bash
pip install -r requirements.txt
```

Run the Flask server

```bash
python app.py
```

Backend runs on

```
http://127.0.0.1:5000
```

---

## Frontend Setup

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

## REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /register | Register a new user |
| POST | /login | Login user |
| GET | /expenses | Get user expenses |
| POST | /expenses | Add expense |
| PUT | /expenses/:id | Update expense |
| DELETE | /expenses/:id | Delete expense |

---

---

## Future Improvements

- 📊 Expense Charts
- 📈 Analytics Dashboard
- 📄 Export PDF
- 📊 Export Excel
- 🌙 Dark Mode
- 📅 Monthly Reports
- 🔍 Search & Filters
- ☁️ PostgreSQL Database
- 📱 Mobile Responsive Improvements

---

## Author

Sai vignesh reddy

GitHub: https://github.com/Saivignesh-18

---

## License

This project is developed for learning, portfolio, and educational purposes.
