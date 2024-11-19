const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

// Get User Info Route (Protected)
router.get('/me', protect, me);

module.exports = router;
