const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:          { type: String, required: true },
  email:         { type: String, required: true, unique: true },
  password:      { type: String, required: true },
  age:           { type: Number },
  gender:        { type: String, enum: ['Male', 'Female'] },
  height_cm:     { type: Number },
  weight_kg:     { type: Number },
  fitness_level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  goal:          { type: String, enum: ['Fat Loss', 'Muscle Gain', 'Maintenance'] },
}, { timestamps: true });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
