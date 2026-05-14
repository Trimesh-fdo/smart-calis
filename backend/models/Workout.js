const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exercise:       { type: String, required: true },
  duration_min:   { type: Number, required: true },
  sets:           { type: Number, default: 3 },
  reps:           { type: Number, default: 10 },
  intensity:      { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  calories_burned:{ type: Number },
  date:           { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
