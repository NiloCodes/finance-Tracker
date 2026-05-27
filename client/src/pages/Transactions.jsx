import { useEffect, useState, useCallback } from "react";
import API from "../api/axios";
import TransactionForm from "../components/TransactionForm";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch {
      setError("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Failed to delete transaction.");
    }
  };

  return (
    <div>
      <h2>My Transactions</h2>

      <TransactionForm onTransactionAdded={fetchTransactions} />

      <hr />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map((t) => (
            <li key={t.id}>
              {t.date?.split("T")[0] ?? t.date} — {t.category} — ${parseFloat(t.amount).toFixed(2)} ({t.type})
              {t.note && ` — ${t.note}`}
              <button onClick={() => handleDelete(t.id)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
