const db = require('../config/db');
const path = require('path');

// Get user profile
exports.getUserProfile = (req, res) => {
  const userId = req.user.id;

  const query = 'SELECT id, username, email, profile_pic, bio FROM users WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result[0]);
  });
};

// Update user profile
exports.updateUserProfile = (req, res) => {
  const userId = req.user.id;
  const { username, bio } = req.body;
  let profilePic = null;

  // If a new profile picture is uploaded, get its file path
  if (req.file) {
    profilePic = req.file.path.replace('uploads/', '/uploads/');
  }

  const query = 'UPDATE users SET username = ?, bio = ?, profile_pic = ? WHERE id = ?';
  db.query(query, [username, bio, profilePic || null, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Profile updated successfully' });
  });
};

// Delete user profile
exports.deleteUserProfile = (req, res) => {
  const userId = req.user.id;

  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  });
};
