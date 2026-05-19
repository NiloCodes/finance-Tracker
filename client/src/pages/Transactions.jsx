import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await API.get("/transactions");
        setTransactions(res.data);
      } catch{
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []); // runs once when page loads

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>My Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet. Add one!</p>
      ) : (
        <ul>
          {transactions.map((t) => (
            <li key={t.id}>
              {t.date} — {t.category} — ${t.amount} ({t.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}