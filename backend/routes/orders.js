const express = require('express');
const Order = require('../models/Order');

module.exports = function(io) {
  const router = express.Router();

  // POST /api/orders - create new order
  router.post('/', async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      io.emit('order:new', { orderId: order._id, status: order.status });
      res.status(201).json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // GET /api/orders/:id - fetch order
  router.get('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      res.json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // PUT /api/orders/:id/status - update order status
  router.put('/:id/status', async (req, res) => {
    try {
      const { status } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!order) return res.status(404).json({ error: 'Order not found' });
      io.emit('order:status', { orderId: order._id, status: order.status });
      res.json(order);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return router;
}
