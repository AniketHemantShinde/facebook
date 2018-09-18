const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  LastName: String,
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  dob: { type: Date, default: Date.now },
  gender: { type: String, enum: ["male", "female"] },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;