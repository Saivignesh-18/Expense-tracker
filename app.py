from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///expenses.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    note = db.Column(db.String(200), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

@app.route("/")
def home():
    return "Flask connected to SQLite successfully"

@app.route("/register", methods=["POST"])
def register():
    data = request.json

    existing_user = User.query.filter_by(email=data["email"]).first()

    if existing_user:
        return jsonify({"message": "Email already registered"}), 400

    hashed_password = generate_password_hash(data["password"])

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Registration successful"})

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    if not check_password_hash(user.password, data["password"]):
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    })

@app.route("/expenses", methods=["POST"])
def add_expense():
    data = request.json

    print(data)
    expense = Expense(
        title=data["title"],
        amount=data["amount"],
        category=data["category"].lower(),
        date=data["date"],
        note=data.get("note", ""),
        user_id=data["user_id"]
    )

    db.session.add(expense)
    db.session.commit()

    return jsonify({
    "message": "Expense added successfully",
    "expense": {
        "id": expense.id,
        "title": expense.title,
        "amount": expense.amount,
        "category": expense.category,
        "date": expense.date,
        "note": expense.note,
        "user_id": expense.user_id
    }
})

@app.route("/expenses", methods=["GET"])
def get_expenses():
    user_id = request.args.get("user_id")

    expenses = Expense.query.filter_by(user_id=user_id).all()

    result = []

    for e in expenses:
        result.append({
            "id": e.id,
            "title": e.title,
            "amount": e.amount,
            "category": e.category,
            "date": e.date,
            "note": e.note,
            "user_id": e.user_id
        })

    return jsonify(result)

@app.route("/expenses/<int:id>", methods=["DELETE"])
def delete_expense(id):
    user_id = request.args.get("user_id")

    expense = Expense.query.filter_by(
        id=id,
        user_id=user_id
    ).first()

    if expense is None:
        return jsonify({"message": "Expense not found"}), 404

    db.session.delete(expense)
    db.session.commit()

    return jsonify({"message": "Expense deleted successfully"})

@app.route("/expenses/<int:id>", methods=["PUT"])
def update_expense(id):
    data = request.json

    expense = Expense.query.filter_by(id=id,user_id=data["user_id"]).first()

    if expense is None:
        return jsonify({"message": "Expense not found"}), 404

    data = request.json

    expense.title = data["title"]
    expense.amount = data["amount"]
    expense.category = data["category"].lower()
    expense.date = data["date"]
    expense.note = data.get("note", "")

    db.session.commit()

    return jsonify({
        "message": "Expense updated successfully",
        "expense": {
            "id": expense.id,
            "title": expense.title,
            "amount": expense.amount,
            "category": expense.category,
            "date": expense.date,
            "note": expense.note
        }
    })

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)