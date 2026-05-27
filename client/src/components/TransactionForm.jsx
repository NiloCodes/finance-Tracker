import { useState } from "react";
import API from "../api/axios";

const CATEGORIES = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  expense: ["Food", "Transport", "Housing", "Entertainment", "Health", "Shopping", "Utilities", "Other"],
};

export default function TransactionForm({ onTransactionAdded }) {
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "Food",
    note: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "type") {
        return { ...prev, type: value, category: CATEGORIES[value][0] };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await API.post("/transactions", {
        ...form,
        amount: parseFloat(form.amount),
      });
      setForm({
        type: "expense",
        amount: "",
        category: "Food",
        note: "",
        date: new Date().toISOString().split("T")[0],
      });
      onTransactionAdded();
    } catch {
      setError("Failed to add transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Add Transaction</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Type</label><br />
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label>Amount ($)</label><br />
          <input
            type="number"
            name="amount"
            placeholder="0.00"
            value={form.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <div>
          <label>Category</label><br />
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES[form.type].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Date</label><br />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Note (optional)</label><br />
          <input
            type="text"
            name="note"
            placeholder="What was this for?"
            value={form.note}
            onChange={handleChange}
          />
        </div>

        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Transaction"}
        </button>
      </form>
    </div>
  );
}
