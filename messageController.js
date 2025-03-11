const db = require('../config/db');

// Send message
exports.sendMessage = (req, res) => {
  const senderId = req.user.id;
  const { receiverId, message } = req.body;

  const query = 'INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)';
  db.query(query, [senderId, receiverId, message], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Message sent' });
  });
};

// Get messages between users
exports.getMessages = (req, res) => {
  const userId = req.user.id;
  const { friendId } = req.query;

  const query = `SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY sent_at ASC`;
  db.query(query, [userId, friendId, friendId, userId], (err, messages) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(messages);
  });
};
