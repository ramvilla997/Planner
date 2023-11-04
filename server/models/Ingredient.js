// server/models/Ingredient.js

const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // ... any other fields you need
});

module.exports = mongoose.model('Ingredient', ingredientSchema);

