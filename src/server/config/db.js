const { Pool } = require("pg"); // Use require
require("dotenv").config(); // Load environment variables

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

module.exports = pool; // Export the pool object using module.exports