const Workout = require('../models/Workout');

const logWorkout = async (req, res) => {
  const { exercise, duration_min, sets, reps, intensity, calories_burned } = req.body;
  try {
    const workout = await Workout.create({
      user: req.user._id,
      exercise,
      duration_min,
      sets,
      reps,
      intensity,
      calories_burned,
    });
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { logWorkout, getWorkouts };
