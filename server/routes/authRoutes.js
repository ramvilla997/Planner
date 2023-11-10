// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User'); // Your User model

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');


// Register endpoint
router.post('/register', async (req, res) => {
  try {

    // Check if user already exists
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // expires in 24 hours
    );
    // Respond with the newly created user
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        username: newUser.username
        // Do not return password
      },
      token: token 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering new user', error: error.message });
  }
});

// Login endpoint
router.post('/login', passport.authenticate('local'), (req, res) => {
  // Assuming req.user contains the authenticated user
  res.json({ message: 'Logged in successfully', user: req.user });
});

// router.get('/logout', (req, res) => {
//   req.logout(); // Passport.js provides this method to logout
//   res.status(200).json({ message: 'Logged out successfully' });
// });

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // Prevents caching
    res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
    res.setHeader('Expires', '0'); // Proxies.
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Could not log out, please try again' });
      } else {
        res.clearCookie('connect.sid'); // Clears the cookie set by express-session
        res.status(200).json({ message: 'Logged out successfully' });
      }
    });
  });
});


module.exports = router;
