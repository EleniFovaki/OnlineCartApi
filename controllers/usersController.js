const User = require('../models/usersModel');

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
    const user = await User.findById(req.params.userId);
    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }
    res.status(200).json(user);
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

// exports.createOrder = () => {return true};
exports.createUser = async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

  // Delete a user by ID
exports.deleteUserById = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'user not found' });
      }
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Update an user by ID
exports.UpdateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);  
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};