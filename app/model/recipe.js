const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Add reference to the User model
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: [String], required: true },
    method: { type: [String], required: true },
    prep_time: { type: String, required: true },
    calories: { type: Number, required: true },
    meal_type: { type: String, required: true },
    isFavorited: { type: Boolean, required: true }
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
