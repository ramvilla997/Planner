const UserProfile = require('../models/UserProfile');

// Fetch user profile
exports.getUserProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ user: req.user._id });
    // If the profile does not exist, you might want to return an empty object
    // with the structure that your frontend expects:
    if (!profile) {
      return res.json({
        tastePreferences: '',
        dietaryRestrictions: [],
        preferredCuisines: [],
        mealTypes: [],
        shoppingFrequency: ''
      });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    // Ensure that the array fields are actually arrays. This might not be necessary
    // if you're sure that the frontend always sends the correct types.
    const updateData = {
      ...req.body,
      dietaryRestrictions: Array.isArray(req.body.dietaryRestrictions) ? req.body.dietaryRestrictions : [],
      preferredCuisines: Array.isArray(req.body.preferredCuisines) ? req.body.preferredCuisines : [],
      mealTypes: Array.isArray(req.body.mealTypes) ? req.body.mealTypes : [],
    };

    let profile = await UserProfile.findOneAndUpdate(
      { user: req.user._id },
      updateData,
      { new: true, upsert: true, runValidators: true } // runValidators will ensure validation for new fields
    );
    res.json(profile);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
