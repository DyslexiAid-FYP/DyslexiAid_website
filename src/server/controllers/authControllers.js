const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables

const { createUser, findUserByEmail } = require("../models/user.js");


// This one checks for characters before @, characters after @, and a dot followed by characters.
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const register = async (req, res) => {
  let { name, email, password, confirmPassword } = req.body;

  // Trim input values to avoid accidental whitespace issues
  name = name ? name.trim() : ''; // Handle potential null/undefined before trimming
  email = email ? email.trim().toLowerCase() : ''; // Handle potential null/undefined

  // --- ADDED: Check if required fields are present BEFORE other checks ---
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // --- ADDED: Email format validation ---
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

 // Check password length
 if (password.length < 6) {
 return res.status(400).json({ error: "Password must be at least 6 characters long" }); }

 // Password confirmation check for registration
 if (password !== confirmPassword) {
 return res.status(400).json({ error: "Passwords do not match" });
 }


  try {
    // Check if user already exists (database check)
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
 }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await createUser(name, email, hashedPassword);

    // Send successful registration response
    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });

  } catch (error) {
    // Catch any unexpected errors during database operations, hashing, etc.
    console.error("Error during registration:", error); // Log error server-side
    res.status(500).json({ error: "Internal server error" }); // Send generic error to client
  }
};

const login = async (req, res) => {
  let { email, password } = req.body;

  // Trim inputs
  email = email ? email.trim().toLowerCase() : ''; // Handle potential null/undefined

  // --- ADDED: Check if required fields are present BEFORE other checks ---
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // --- ADDED: Email format validation ---
  if (!emailRegex.test(email)) {
   
    return res.status(400).json({ error: "Invalid email format" });
  }


  try {
    // Find user by email
    const user = await findUserByEmail(email);
    // Use a generic error for "user not found" to avoid leaking info
    if (!user) return res.status(400).json({ error: "Invalid email or password" });

    // Compare submitted password with hashed password in database
    const isMatch = await bcrypt.compare(password, user.password);
    // Use a generic error for "password doesn't match" to avoid leaking info
    if (!isMatch) return res.status(400).json({ error: "Invalid email or password" });

    // If email and password are correct, generate JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Optionally, send the token as a secure httpOnly cookie (recommended)
    res.cookie("token", token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: 'strict', // Added for better security against CSRF
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds (1 day)
    });

    // Send successful login response (including token in body is common too)
    res.json({
      message: "Login successful",
      token, // Often sent in the body for client-side storage or header use
      user: { id: user.id, name: user.name, email: user.email },
    });

  } catch (error) {
    // Catch any unexpected errors during database operations, comparison, etc.
    console.error("Error during login:", error); // Log error server-side
    res.status(500).json({ error: "Internal server error" }); // Send generic error to client
  }
};

module.exports = { register, login };