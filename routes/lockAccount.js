const express = require('express');
const router = express.Router();

// Import your User model or schema
const User = require('../models/user'); // Adjust the import path as needed

// Route for locking the account
router.post('/', async (req, res) => {
  const userId = req.body.userId; // You need to pass the user's ID in the request

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's account status to 'locked' in the database
    user.status = false; // Lock the account
    await user.save();

    res.json({ message: 'Account is now locked.' });
  } catch (error) {
    console.error('Error updating account status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;