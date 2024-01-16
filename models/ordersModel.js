const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  total: Number,
  orderDate: Date,
  state: {
    type: String,
    enum: ['send', 'in progress', 'done'],
    default: 'in progress',
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;