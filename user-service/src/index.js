require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes');
const path = require('path');

const app = express();
app.use(express.json());
require('./middleware/response')(app);

app.get('/health', (req, res) => {
    console.log("hello world");
    res.send("✅ Server is healthy");
  });
app.use('/api/user', routes.UserRouter);

(async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB connected');
      
      app.listen(3000, () => console.log('Server running on port 3000'));
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  })();