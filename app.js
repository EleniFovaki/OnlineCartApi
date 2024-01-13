const express = require('express'); //from documentation of express
const app = express(); //same
const port = 3000;
const mongoose = require('mongoose');

//connection strings for our mongodb
const dbURI = 'mongodb+srv://fovakieleni:1234567890@testcluster.gtmlgb9.mongodb.net/onlinecart?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true })
.then ((result)=>console.log('connected to db'))
.catch((err)=> console.log(err));


// Middleware to parse JSON requests (so that my app can understand json)
app.use(express.json());

// Sample route
app.get('/api/greeting', (req, res) => {
  res.json({ message: 'Hello, this is your REST API!' });
});

app.get('/api/users', async (req, res) => {
  const users = await collection.find({}).toArray();
  res.json(users);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


