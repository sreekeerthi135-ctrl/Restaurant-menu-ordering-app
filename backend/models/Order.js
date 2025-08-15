const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [{
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name: String,
    quantity: { type: Number, default: 1 },
    unitPrice: Number,
    notes: String
  }],
  totalAmount: { type: Number, required: true },
  customerName: String,
  tableNumber: String, // optional for dine-in
  status: { type: String, enum: ['PLACED', 'PREPARING', 'READY', 'SERVED', 'CANCELLED'], default: 'PLACED' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
