const pool = require('../config/db'); // Import the pool object from db.js

// Function to create the test_results table and ensure the unique constraint exists
const createTestResultTable = async () => {
    console.log('--> Entering createTestResultTable function');

    // Query to create the table if it doesn't exist (without the unique constraint here)
    // We'll add the constraint separately to handle cases where the table already exists
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS test_results (
            id SERIAL PRIMARY KEY,
            userId VARCHAR(255) NOT NULL,
            testName VARCHAR(255) NOT NULL,
            score INTEGER NOT NULL,
            misses INTEGER NOT NULL,
            accuracy FLOAT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    // Query to add the unique constraint if it doesn't exist
    // We give the constraint a name (e.g., test_results_user_test_unique)
    const addConstraintQuery = `
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT constraint_name
                FROM information_schema.table_constraints
                WHERE table_schema = current_schema()
                AND table_name = 'test_results'
                AND constraint_type = 'UNIQUE'
                AND constraint_name = 'test_results_user_test_unique' -- Use a specific name for the constraint
            ) THEN
                ALTER TABLE test_results
                ADD CONSTRAINT test_results_user_test_unique UNIQUE (userId, testName);
            END IF;
        END
        $$;
    `;

    try {
        // First, ensure the table exists
        console.log('Attempting to create test_results table if it does not exist.');
        await pool.query(createTableQuery);
        console.log('test_results table created or already exists.');

        // Then, attempt to add the unique constraint
        console.log('Attempting to add unique constraint to test_results table if it does not exist.');
        await pool.query(addConstraintQuery);
        console.log('Unique constraint added or already exists on test_results table.');

        console.log('<-- Exiting createTestResultTable function with success');
    } catch (err) {
        console.error('Error in createTestResultTable:', err);
        console.log('<-- Exiting createTestResultTable function with error');
        throw err; // Re-throw the error
    }
};


// Function to insert or update a test result (upsert) - This remains the same
const upsertTestResult = async (userId, testName, score, misses, accuracy) => {
    console.log('--> Entering upsertTestResult function');

    // Ensure userId is treated as a string for the database query
    const userIdString = String(userId);

    const query = `
      INSERT INTO test_results (userId, testName, score, misses, accuracy)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (userId, testName)
      DO UPDATE SET
        score = EXCLUDED.score,
        misses = EXCLUDED.misses,
        accuracy = EXCLUDED.accuracy,
        createdAt = CURRENT_TIMESTAMP
      RETURNING *;
    `.trim();

    const values = [userIdString, testName, score, misses, accuracy];

    console.log('Attempting to execute database query with values:', values);
    console.log('SQL Query:', query);


    try {
      const result = await pool.query(query, values);

      console.log('Database query executed successfully.');

      if (result.rows.length > 0) {
          console.log('Test result upserted (inserted or updated):', result.rows[0]);
          console.log('<-- Exiting upsertTestResult function with success');
          return result.rows[0];
      } else {
          console.warn('Upsert query executed but no row was returned.');
          console.log('<-- Exiting upsertTestResult function with no row returned');
          return null;
      }
    } catch (err) {
      console.error('--> Error during upsertTestResult database operation:', err);
      console.log('<-- Exiting upsertTestResult function with error');
      throw err;
    }
  };


// Function to fetch all test results (kept as is)
const getAllTestResults = async () => {
  console.log('--> Entering getAllTestResults function');
  const query = 'SELECT * FROM test_results';

  try {
    const result = await pool.query(query);
    console.log('All test results:', result.rows);
    console.log('<-- Exiting getAllTestResults function with success');
    return result.rows;
  } catch (err) {
    console.error('Error fetching test results:', err);
    console.log('<-- Exiting getAllTestResults function with error');
    throw err;
  }
};

module.exports = {
  createTestResultTable,
  upsertTestResult,
  getAllTestResults,
};
