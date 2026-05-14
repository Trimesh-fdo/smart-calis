const mongoose = require('mongoose');

const weightLogSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weight_kg: { type: Number, required: true },
  note:      { type: String },
  date:      { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('WeightLog', weightLogSchema);
