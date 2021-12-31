const { Pool } = require("pg");

// const dbPool = new Pool({
//   database: "personal_web",
//   port: 5432,
//   user: "postgres",
//   password: "root",
// });

const dbPool = new Pool({
  database: process.env.DATABASE_URL,
});

module.exports = dbPool;
