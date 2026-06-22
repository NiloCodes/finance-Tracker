const pool = require("../config/db");

exports.getTransactions = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id=$1 ORDER BY date DESC",
      [req.userId],
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addTransaction = async (req, res) => {
  const { type, amount, category, note, date } = req.body;

  await pool.query(
    `INSERT INTO transactions (user_id, type, amount, category, note, date)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [req.userId, type, amount, category, note, date],
  );

  res.json({ message: "Transaction added" });
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM transactions WHERE id=$1 AND user_id=$2", [
    id,
    req.userId,
  ]);

  res.json({ message: "Deleted" });
};
