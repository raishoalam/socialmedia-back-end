// routes/messageRoutes.js

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

// Send a message
router.post('/send', authMiddleware, messageController.sendMessage);

// Get messages between two users
router.get('/conversation/:userId', authMiddleware, messageController.getMessages);

// Mark message as read
router.post('/read', authMiddleware, messageController.markAsRead);

module.exports = router;
