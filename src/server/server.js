const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userroutes'); // Import the user routes file
const testResultsRouter = require('./routes/testresults'); // Import the test results router

// Import the database table creation function
const { createTestResultTable } = require('./models/testresults');

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parses incoming requests with JSON payloads
app.use(cors()); // Enables CORS for all origins

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Use your routers
app.use(userRoutes); // Use the user routes in your app
app.use("/api/auth", authRoutes); // Mount auth routes under /api/auth
// Mount test results routes under /api/test-results
app.use('/api/test-results', testResultsRouter);


// Define the port
const PORT = process.env.PORT || 5000;

// Async function to initialize database and start the server
const startServer = async () => {
  try {
    // Call the function to create the table and add the unique constraint
    console.log('--> Starting database table setup...');
    await createTestResultTable();
    console.log('<-- Database table setup complete.');

    // Start the Express server after database setup is complete
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server due to database setup error:', error);
    // Exit the process if database setup fails
    process.exit(1);
  }
};

// Call the async function to start the server
startServer();
