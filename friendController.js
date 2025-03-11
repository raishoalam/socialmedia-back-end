const db = require('../config/db');

// Send friend request
exports.sendFriendRequest = (req, res) => {
  const userId = req.user.id;
  const { friendId } = req.body;

  const query = 'INSERT INTO friends (user_id, friend_id, status) VALUES (?, ?, ?)';
  db.query(query, [userId, friendId, 'pending'], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Friend request sent' });
  });
};

// Accept friend request
exports.acceptFriendRequest = (req, res) => {
  const userId = req.user.id;
  const { friendId } = req.body;

  const query = 'UPDATE friends SET status = "accepted" WHERE user_id = ? AND friend_id = ?';
  db.query(query, [friendId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Friend request accepted' });
  });
};

// Get friends list
exports.getFriendsList = (req, res) => {
  const userId = req.user.id;

  const query = `SELECT users.id, users.username, users.profile_pic FROM friends
                 JOIN users ON users.id = friends.friend_id
                 WHERE friends.user_id = ? AND friends.status = 'accepted'`;
  db.query(query, [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
};
