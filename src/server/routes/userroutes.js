const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware'); // Import the authentication middleware
const router = express.Router(); // Create a new router

// Define the route to fetch the user ID
router.get('/user/id', authMiddleware, (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(400).json({ message: 'User ID not found in token' });
  }
  res.json({ userId: req.user.userId }); // Return the user ID
});



// Export the router to use in the main server
module.exports = router;
