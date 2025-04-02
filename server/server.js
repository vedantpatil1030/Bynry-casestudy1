const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const profileRoutes = require('./routes/profileRoutes');
const { connectDB } = require('./config/db');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded profile images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/profiles', profileRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : null
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});