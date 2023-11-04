const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  }],
  instructions: {
    type: String,
    required: true
  },
  // ... any other fields like cuisine, dietary restrictions, etc.
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
