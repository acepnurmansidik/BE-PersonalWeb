const { Pool } = require("pg");

const dbPool = new Pool({
  database: process.env.DB_URL,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = dbPool;
