const mongoose = require('mongoose');

const thingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: String,
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Stuff', thingSchema);
