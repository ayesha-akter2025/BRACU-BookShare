const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 📌 Get a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // don't send password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📌 Update profile
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password'); // don't send password
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {

    console.error('Update error:', err); // log the actual error

    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
