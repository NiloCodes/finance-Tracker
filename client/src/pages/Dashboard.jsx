import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function groupByMonth(transactions) {
  const map = {};

  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleString("default", { month: "short", year: "numeric" });

    if (!map[key]) map[key] = { month: label, income: 0, expenses: 0 };

    if (t.type === "income") map[key].income += parseFloat(t.amount);
    else map[key].expenses += parseFloat(t.amount);
  });

  return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await API.get("/transactions");
        setTransactions(res.data);
      } catch {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpenses;
  const chartData = groupByMonth(transactions);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Dashboard</h2>

      <div>
        <p>Balance: ${balance.toFixed(2)}</p>
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      </div>

      <h3>Income vs Expenses by Month</h3>

      {chartData.length === 0 ? (
        <p>No data to display yet. Add some transactions.</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="income" fill="#16a34a" name="Income" />
            <Bar dataKey="expenses" fill="#dc2626" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
