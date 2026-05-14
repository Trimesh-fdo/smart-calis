const express = require('express');
const router = express.Router();
const { logWorkout, getWorkouts } = require('../controllers/workoutController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, logWorkout);
router.get('/',  protect, getWorkouts);

module.exports = router;
