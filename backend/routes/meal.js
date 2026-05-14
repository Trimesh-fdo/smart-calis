const express = require('express');
const router = express.Router();
const { generateMeal, getMeals, getTDEE } = require('../controllers/mealController');
const { protect } = require('../middleware/authMiddleware');

router.post('/',     protect, generateMeal);
router.get('/',      protect, getMeals);
router.get('/tdee',  protect, getTDEE);

module.exports = router;
