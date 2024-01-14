const Order = require('../models/ordersModel');

exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: 'order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// exports.createOrder = () => {return true};
exports.createOrder = async (req, res) => {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  // Delete a product by ID
  exports.deleteOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Update an order by ID
  exports.updateOrder = async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(
        req.params.orderId,
        req.body,
        { new: true }
      );
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json(order);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };