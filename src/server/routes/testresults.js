console.log('--> Loading routes/testresults.js file'); // Add this line

const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware'); // Import the middleware
// CORRECTED: Import the NEW upsertTestResult function
const { upsertTestResult } = require('../models/testresults');
const router = express.Router();

console.log('--> Defining POST /submit route'); // Add this log

// Endpoint to submit the test result
router.post('/submit', authMiddleware, async (req, res) => {
  console.log('Received test result submission request'); // Log request

  const { testName, score, misses, accuracy } = req.body;

  // Log original data and types
  console.log('Test Result Data:', testName, score, misses, accuracy);
  console.log(`Original Data types: testName=${typeof testName}, score=${typeof score}, misses=${typeof misses}, accuracy=${typeof accuracy}`);

  // Convert accuracy string to a number
  const parsedAccuracy = parseFloat(accuracy);
  // Keep score and misses as they seem to be numbers already, but you could parse them too for safety
  const parsedScore = score; // Assuming score is already a number
  const parsedMisses = misses; // Assuming misses is already a number


  // Log parsed data and types
  console.log('Parsed Data:', testName, parsedScore, parsedMisses, parsedAccuracy);
  console.log(`Parsed Data types: testName=${typeof testName}, score=${typeof parsedScore}, misses=${typeof parsedMisses}, accuracy=${typeof parsedAccuracy}`);


  // Extract the userId from the middleware (assuming it's the email based on models)
  const userId = req.user.userId; // This should be the email if that's what authMiddleware provides

  // Basic validation
  if (!testName || parsedScore === undefined || parsedMisses === undefined || parsedAccuracy === undefined) {
    console.log('Validation failed: Missing required data after parsing'); // Added log for validation failure
    return res.status(400).json({ message: 'Missing required test result data after parsing' });
  }

  // Validate data types and check for NaN after parsing
  if (typeof parsedScore !== 'number' || typeof parsedMisses !== 'number' || typeof parsedAccuracy !== 'number' || isNaN(parsedScore) || isNaN(parsedMisses) || isNaN(parsedAccuracy)) {
       console.log('Validation failed: Invalid data types or NaN after parsing'); // Added log for validation failure
       return res.status(400).json({ message: 'Invalid data types or format for score, misses, or accuracy after parsing' });
  }

  console.log('--> Validation passed. Entering try block.'); // ADD THIS NEW LOG HERE

  try {
    console.log('--> About to call upsertTestResult function'); // Add this log
    console.log('--> Preparing to await upsertTestResult'); // ADD THIS NEW LOG
    // CORRECTED: Call the upsert function with the PARSED values
    const result = await upsertTestResult(userId, testName, parsedScore, parsedMisses, parsedAccuracy);
    console.log('<-- Returned from upsertTestResult function'); // Add this log

    // Check if the upsert operation was successful and returned a row
    if (result) {
         res.status(200).json({ message: 'Test result processed successfully', result });
    } else {
         // This case should ideally be handled by the upsert function throwing an error,
         // but this provides an extra layer of safety.
         console.error('Upsert operation did not return a result.');
         res.status(500).json({ message: 'Failed to process test result: No data returned from database operation' });
    }

  } catch (err) {
    console.error('Error processing test result:', err);
    // Check if the error is a specific database error if needed for more granular responses
    // For now, a generic 500 error is sufficient.
    res.status(500).json({ message: 'Failed to process test result', error: err.message });
  }
});

module.exports = router;
