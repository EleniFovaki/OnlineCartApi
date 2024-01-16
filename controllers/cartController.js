const Cart = require('../models/cartModel');


exports.getAllCarts = async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


exports.getCartById = async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.cartId);
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Create a new cart
exports.createCart = async (req, res) => {
    const { userId, products } = req.body;

    try {
        const newCart = new Cart({
            userId,
            products,
        });

        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
  
exports.deleteCartById = async (req, res) => {
    try {
      const cart = await Cart.findByIdAndDelete(req.params.cartId);
      if (!cart) {
        return res.status(404).json({ message: 'cart not found' });
      }
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};


exports.updateCart = async (req, res) => {
    try {
      const cart = await Cart.findByIdAndUpdate(
        req.params.cartId,
        req.body,
        { new: true }
      );
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.status(200).json(cart);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};