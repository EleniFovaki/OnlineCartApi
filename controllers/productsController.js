const Product = require('../models/productsModel');

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Create a new product
  exports.createProduct = async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    // Use the findByIdAndUpdate method to find and update a product by ID
    const product = await Product.findByIdAndUpdate(
      req.params.productId,  // The first parameter is the ID of the product to update
      req.body,  // The second parameter is the updated data for the product
      { new: true }  // The third parameter, { new: true }, ensures that the updated product is returned
    );

    // Check if the product was not found
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If the product was successfully updated, respond with the updated product data
    res.status(200).json(product);  
  } catch (error) {
    // If an error occurs during the update process, respond with a 500 Internal Server Error and the error message
    res.status(500).json({ error: error.message });
  }
};
  
  // Delete a product by ID
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };