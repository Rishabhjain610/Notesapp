const express = require('express');
const cors = require('cors');
const auth = require('../server/routes/auth');
const note = require('../server/routes/note');
const connectdb = require('./db/db');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON payloads
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

// Routes
app.use('/api/auth', auth);
app.use('/api/note', note);
app.get('/', (req, res) => {
  res.send('Hi, hello!');
});

// Start the server
const PORT = 1234;
app.listen(PORT, () => {
  connectdb();
  console.log(`Server is running on port ${PORT}`);
});


// import express from 'express';
// import cors from 'cors';
// import auth from '../server/routes/auth.js'; // Ensure the file extension is added for ES Modules
// import connectdb from './db/db.js'; // Ensure the file extension is added for ES Modules

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json()); // To parse JSON payloads
// app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data

// // Routes
// app.use('/api/auth', auth);

// app.get('/', (req, res) => {
//   res.send('Hi, hello!');
// });

// // Start the server
// const PORT = 1234;

// app.listen(PORT, () => {
//   connectdb();
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
