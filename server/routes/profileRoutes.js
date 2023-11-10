const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userProfileController');
const authenticate = require('../middleware/authenticate'); // Middleware to check if the user is logged in

router.get('/profile', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);

module.exports = router;
