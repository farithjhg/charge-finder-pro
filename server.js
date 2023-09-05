const express = require('express');
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
//const mongoose = require('mongoose');
const Openchargemap = require('./schemas/openchargemapSchema');

connectDB()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const PORT = process.env.PORT || 3000;

// Define API routes
app.get('/openchargemap', async (req, res) => {
  try {
    const data = await Openchargemap.find().exec();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error:'+error });
  }
});

app.get('/', async (req, res) => {
  try {
    const data = {message: 'Site is available!'};
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error:'+error });
  }
});

/*
app.get('/electrolineras', async (req, res) => {
  try {
    const data = await Electrolinera.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error:'+error });
  }
});
*/

app.use('/api/points', require('./routes/PointRoutes'))
app.use('/api/users', require('./routes/UserRoutes'))
app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Resources: \n`+'/api/points');
  console.log(`Resources: \n`+'/api/users');
});
