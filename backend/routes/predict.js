const express = require('express');
const router = express.Router();
const { predictCalories, predictExercises, predictMealPlan } = require('../controllers/predictController');
const { protect } = require('../middleware/authMiddleware');

router.post('/calories',  protect, predictCalories);
router.post('/exercises', protect, predictExercises);
router.post('/meal-plan', protect, predictMealPlan);

module.exports = router;
