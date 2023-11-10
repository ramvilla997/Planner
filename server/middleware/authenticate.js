// server/middleware/authenticate.js

function authenticate(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  }
  
  module.exports = authenticate;
  