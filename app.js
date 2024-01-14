const express = require('express'); //from documentation of express
const app = express(); //same
const port = 3000;
const mongoose = require('mongoose');
const User = require('./models/usersModel');
const Order = require('./models/ordersModel');
const Product = require('./models/productsModel');
const ProductController = require('./controllers/productsController');
const OrderController = require('./controllers/ordersController');
const UserController = require('./controllers/usersController');

//connection strings for our mongodb
const dbURI = 'mongodb+srv://fovakieleni:1234567890@testcluster.gtmlgb9.mongodb.net/onlinecart?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then ((result)=>console.log('connected to db'))
.catch((err)=> console.log(err));

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

// console.log();
// Save the new user to the database
// newOrder.save()
//   .then(savedUser => {
//     console.log('User saved:', savedUser);
//   })
//   .catch(error => {
//     console.error('Error saving user:', error.message);
//   });

// Route to fetch all users

getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

app.use(express.json());
// API CALLS
   // USERS ROUTES
app.get('/users', getAllUsers);


  // PRODUCT ROUTES  
app.get('/products', ProductController.getAllProducts);
app.post('/products', ProductController.createProduct);
app.get('/products/:productId', ProductController.getProductById);
app.delete('/products/:productId', ProductController.deleteProduct);
app.patch('/products/:productId', ProductController.updateProduct);

  // ORDERS ROUTES
  app.get('/orders', OrderController.getAllOrders);
  app.get('/orders/:orderId', OrderController.getOrderById);
  app.post('/orders', OrderController.createOrder);
  app.delete('/orders/:orderId', OrderController.deleteOrder);
  app.patch('/orders/:orderId', OrderController.updateOrder);

  // USERS ROUTES
  app.get('/users', UserController.getAllUsers);
  app.get('/users/:userId', UserController.getUserById);
  app.post('/users/', UserController.createUser);
  app.delete('/users/:userId', UserController.deleteUserById);
  app.patch('/users/:userId', UserController.UpdateUser);

// Middleware to parse JSON requests (so that my app can understand json)


greetingResponse = (req, res) => {
  res.json({ message: 'Hello, this is your REST API!' });
}

// Sample route
app.get('/api/greeting', greetingResponse);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


