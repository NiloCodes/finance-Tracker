const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Finance Tracker API Running");
});

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);

module.exports = app;
