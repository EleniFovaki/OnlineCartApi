const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name must have a value"]
    },
    email: {
        type: String,
        required: [true, "email must have a value"]
    },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    role: {
        type: String,
        enum: ['user', 'admin'], // Enumerate the allowed roles
        default: 'user', // Set a default role if not specified
      },
    cart: {
      items: [
        {
          name: String,
          price: Number,
        },
      ],
      total: Number,
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User