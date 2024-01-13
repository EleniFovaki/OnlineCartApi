const express = require('express'); //from documentation of express
const app = express(); //same
const port = 3000;
const mongoose = require('mongoose');
const User = require('./models/usersModel');
const Order = require('./models/ordersModel');
const Product = require('./models/productsModel');

//connection strings for our mongodb
const dbURI = 'mongodb+srv://fovakieleni:1234567890@testcluster.gtmlgb9.mongodb.net/onlinecart?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then ((result)=>console.log('connected to db'))
.catch((err)=> console.log(err));

  // Define the User model after the mongoose connection



// Example usage
const newUser = new User({
  username: 'john_doe',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St, Cityville',
  phoneNumber: '555-1234',
  cart: {
    items: [
      { name: 'Product1', price: 1200 },
      { name: 'Product2', price: 1400 },
    ],
    total: 2600,
  },
});

const newOrder = new Order({
  user: "659fd8591d5ee5badae6faaa",
  items: [
    {
      product: "65a2cf939ea007805ad9b328",
      quantity: 3,
    },
    {
      product: "65a2cf939ea007805ad9b329",
      quantity: 2
    }
  ],
  total: 15,
  orderDate: new Date(),
})

console.log(newUser);
// Save the new user to the database
newOrder.save()
  .then(savedUser => {
    console.log('User saved:', savedUser);
  })
  .catch(error => {
    console.error('Error saving user:', error.message);
  });

// Route to fetch all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to parse JSON requests (so that my app can understand json)
app.use(express.json());

// Sample route
app.get('/api/greeting', (req, res) => {
  res.json({ message: 'Hello, this is your REST API!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


