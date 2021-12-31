const { Pool } = require("pg");

const dbPool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_URL,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

module.exports = dbPool;
