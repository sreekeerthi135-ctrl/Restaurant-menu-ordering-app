const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('MenuItem', MenuItemSchema);
