const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  user:            { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  goal:            { type: String, required: true },
  calories_target: { type: Number },
  breakfast:       { type: String },
  lunch:           { type: String },
  dinner:          { type: String },
  snack:           { type: String },
}, { timestamps: true });

module.exports = mongoose.model('MealPlan', mealPlanSchema);
