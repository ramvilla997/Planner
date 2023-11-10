const express = require('express');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');
const authRoutes = require("./routes/authRoutes.js")
const profileRoutes = require('./routes/profileRoutes'); 
const app = express();
const mongoose = require('mongoose');
const passport = require('./passport-config');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Your user model
require('dotenv').config();

app.use(cors());
app.use(express.json()); // for parsing application/json

// Express session
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET, // Replace with your SESSION_SECRET environment variable
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/recipes', recipesRouter);
app.use('/auth', authRoutes);
app.use('/api/user', profileRoutes);



// Database connection
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Example route
app.get('/api/recipes', (req, res) => {
  res.json([{ name: 'Tomato Soup', id: 1 }, { name: 'Grilled Cheese', id: 2 }]);
});


// Route for handling login
app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'); // Or send some JSON response indicating success
  }
);


function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
