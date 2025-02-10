const pool = require("../config/db.js"); // Use require for CommonJS

const createUser = async (name, email, hashedPassword) => {
  try {
    const { rows } = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );
    return rows[0];
  } catch (error) {
    console.error("Error creating user:", error); // Log the error
    throw error; // Re-throw the error to be handled by the caller
  }
};

const findUserByEmail = async (email) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0];
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

module.exports = { createUser, findUserByEmail }; // Export the functions