const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
    // match: [/.+@.+\..+/, 'Please enter a valid email address']
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('User', userSchema);
