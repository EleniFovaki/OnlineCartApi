const express = require('express'); //from documentation of express
const app = express(); //same, from documentation of express
const mongoose = require('mongoose');
const User = require('./models/usersModel');
const Order = require('./models/ordersModel');
const Product = require('./models/productsModel');
const ProductController = require('./controllers/productsController');
const OrderController = require('./controllers/ordersController');
const UserController = require('./controllers/usersController');
const cartController = require('./controllers/cartController');
//middleware that enables CORS for routes
const cors = require('cors');
const dotenv = require('dotenv');
// Load variables from env
dotenv.config({ path: './config.env'});
const dbURI = process.env.DATABASE;
const port = process.env.PORT;

//connection for our mongodb
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then ((result)=>console.log('connected to db'))
.catch((err)=> console.log(err));

app.use(cors());

// Middleware to parse JSON requests (so that my app can understand json)
app.use(express.json());

// My API calls start here:
  // PRODUCTS
app.get('/products', ProductController.getAllProducts);
app.get('/products/:productId', ProductController.getProductById);
app.post('/products', ProductController.createProduct);
app.delete('/products/:productId', ProductController.deleteProduct);
app.patch('/products/:productId', ProductController.updateProduct);

  // ORDERS
  app.get('/orders', OrderController.getAllOrders);
  app.get('/orders/:orderId', OrderController.getOrderById);
  app.post('/orders', OrderController.createOrder);
  app.delete('/orders/:orderId', OrderController.deleteOrder);
  app.patch('/orders/:orderId', OrderController.updateOrder);

  // USERS
  app.get('/users', UserController.getAllUsers);
  app.get('/users/:userId', UserController.getUserById);
  app.post('/users/', UserController.createUser);
  app.delete('/users/:userId', UserController.deleteUserById);
  app.patch('/users/:userId', UserController.UpdateUser);

    // CART
    app.get('/carts', cartController.getAllCarts);
    app.post('/carts', cartController.createCart);
    app.delete('/carts/:cartId', cartController.deleteCartById);
    app.patch('/carts/:cartId', cartController.updateCart);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


