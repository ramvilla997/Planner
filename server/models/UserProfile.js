// server/models/UserProfile.js

const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tastePreferences: { type: String, default: '' },
  dietaryRestrictions: { type: [String], default: [] },
  preferredCuisines: { type: [String], default: [] },
  mealTypes: { type: [String], default: [] },
  shoppingFrequency: { type: String, default: '' },
  // ... any other fields ...
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
