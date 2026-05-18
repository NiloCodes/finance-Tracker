const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finance_app",
  password: "admin123", // must match what you set
  port: 5433,
});

module.exports = pool;
