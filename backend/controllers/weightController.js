const WeightLog = require('../models/WeightLog');
const User = require('../models/User');

const logWeight = async (req, res) => {
  const { weight_kg, note } = req.body;
  try {
    const entry = await WeightLog.create({ user: req.user._id, weight_kg, note });
    await User.findByIdAndUpdate(req.user._id, { weight_kg });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getWeightLogs = async (req, res) => {
  try {
    const logs = await WeightLog.find({ user: req.user._id }).sort({ date: -1 }).limit(60);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { logWeight, getWeightLogs };
