const db = require('../config/db');

// Create post
exports.createPost = (req, res) => {
  const userId = req.user.id;
  const { content } = req.body;
  const image = req.file ? req.file.path : null; 
  const video = req.body.video || null;

  const query = 'INSERT INTO posts (user_id, content, image, video) VALUES (?, ?, ?, ?)';
  db.query(query, [userId, content, image, video], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Post created' });
  });
};

// Get user posts
exports.getUserPosts = (req, res) => {
  const userId = req.user.id;

  const query = 'SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC';
  db.query(query, [userId], (err, posts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(posts);
  });
};

// Get news feed (posts from friends)
exports.getNewsFeed = (req, res) => {
  const userId = req.user.id;

  const query = `
    SELECT posts.* FROM posts
    JOIN friends ON friends.friend_id = posts.user_id
    WHERE friends.user_id = ? AND friends.status = 'accepted'
    ORDER BY posts.created_at DESC
  `;
  db.query(query, [userId], (err, posts) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(posts);
  });
};
