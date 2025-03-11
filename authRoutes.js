const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Now this should work
const router = express.Router();

// User Registration route
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    // Create a new user using the model
    User.createUser(username, email, hashedPassword, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error creating user" });
      }
      res.status(201).json({ message: "User registered successfully!" });
    });
  });
});

// User Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  User.findByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = results[0];

    // Compare password with hashed password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });
      res.json({ token });
    });
  });
});

module.exports = router;
