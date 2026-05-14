const axios = require('axios');

const ML_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

const predictCalories = async (req, res) => {
  try {
    const { data } = await axios.post(`${ML_URL}/predict/calories`, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'ML service error: ' + err.message });
  }
};

const predictExercises = async (req, res) => {
  try {
    const { data } = await axios.post(`${ML_URL}/predict/exercises`, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'ML service error: ' + err.message });
  }
};

const predictMealPlan = async (req, res) => {
  try {
    const user = req.user;
    const payload = {
      age:           user.age,
      gender:        user.gender,
      height_cm:     user.height_cm,
      weight_kg:     user.weight_kg,
      fitness_level: user.fitness_level,
      goal:          req.body.goal || user.goal,
      intensity:     req.body.intensity || 'Medium',
      calories_burned: req.body.calories_burned || 300,
    };
    const { data } = await axios.post(`${ML_URL}/predict/meal-plan`, payload);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'ML service error: ' + err.message });
  }
};

module.exports = { predictCalories, predictExercises, predictMealPlan };
