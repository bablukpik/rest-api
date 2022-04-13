const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Customer', customerSchema)
