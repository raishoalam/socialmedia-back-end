// routes/friendRoutes.js
const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friendController');
const authMiddleware = require('../middleware/authMiddleware'); // Correct path

// Send friend request
router.post('/send', authMiddleware, friendController.sendFriendRequest);

// Accept friend request
router.post('/accept', authMiddleware, friendController.acceptFriendRequest);

// Get friends list
router.get('/list', authMiddleware, friendController.getFriendsList);

module.exports = router;
