const MealPlan = require('../models/MealPlan');

const MEAL_PLANS = {
  'Fat Loss': {
    breakfast: 'Boiled eggs (3) + Green tea + Oats (50g)',
    lunch:     'Grilled chicken breast (150g) + Salad + Brown rice (100g)',
    dinner:    'Steamed fish (120g) + Stir-fried vegetables',
    snack:     'Apple + 10 Almonds',
  },
  'Muscle Gain': {
    breakfast: 'Eggs (4) + Banana + Whole grain bread (2 slices) + Milk (250ml)',
    lunch:     'White rice (200g) + Chicken breast (200g) + Lentils (100g)',
    dinner:    'Pasta (150g) + Tuna (120g) + Broccoli',
    snack:     'Peanut butter (2 tbsp) + Rice cakes + Protein shake',
  },
  'Maintenance': {
    breakfast: 'Oats (60g) + Mixed fruits + Greek yogurt (150g)',
    lunch:     'Rice (150g) + Mixed vegetables + Chicken (150g)',
    dinner:    'Vegetable soup + Whole grain bread (2 slices) + Boiled egg (2)',
    snack:     'Mixed nuts (30g) + Orange',
  },
};

function calcTDEE(user) {
  const { age, gender, weight_kg, height_cm, fitness_level } = user;
  if (!age || !weight_kg || !height_cm) return null;

  const bmr = gender === 'Female'
    ? 10 * weight_kg + 6.25 * height_cm - 5 * age - 161
    : 10 * weight_kg + 6.25 * height_cm - 5 * age + 5;

  const pal = { Beginner: 1.375, Intermediate: 1.55, Advanced: 1.725 }[fitness_level] || 1.55;
  const tdee = bmr * pal;

  const adjustment = { 'Fat Loss': -400, 'Muscle Gain': 350, 'Maintenance': 0 }[user.goal] || 0;
  return Math.round(tdee + adjustment);
}

const generateMeal = async (req, res) => {
  const { goal, calories_target } = req.body;
  try {
    const target = calories_target || calcTDEE(req.user) || 2000;
    const plan   = MEAL_PLANS[goal] || MEAL_PLANS['Maintenance'];
    const saved  = await MealPlan.create({ user: req.user._id, goal, calories_target: target, ...plan });
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMeals = async (req, res) => {
  try {
    const meals = await MealPlan.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(7);
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTDEE = async (req, res) => {
  try {
    const tdee = calcTDEE(req.user);
    if (!tdee) return res.status(400).json({ message: 'Incomplete profile (age/weight/height needed)' });
    res.json({ tdee, goal: req.user.goal });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { generateMeal, getMeals, getTDEE };
