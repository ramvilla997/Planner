const express = require('express');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Import your User model

const app = express();

// Middleware for session handling
app.use(session({
  secret: process.env.SESSION_SECRET, // Keep this secret in .env file
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and use sessions
app.use(passport.initialize());
app.use(passport.session());

// Define local strategy for Passport
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (e) {
      return done(e);
    }
  }
));

// Serializing user to decide which data of the user object should be stored in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// The counterpart of serializeUser
// The user id stored in the session is used to retrieve the whole object via the callback function
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
module.exports = passport;
