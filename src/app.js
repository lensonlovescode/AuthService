#!/usr/bin/env node

const express = require('express');
const mongoose = require('mongoose');
const AuthRoutes = require('../src/routes/index');
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

app.set('view engine', 'ejs');

const dbURI = 'mongodb://127.0.0.1:27017/shopture-auth'; 

mongoose.connect(dbURI, {
})
  .then(() => {
    console.log('Connected to local MongoDB');
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch(err => console.error('MongoDB connection error:', err));

  
  app.use(AuthRoutes)