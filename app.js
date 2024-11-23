require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // Ensure this handles and logs connection issues
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect Database
connectDB(); // Ensure proper logging and error handling in connectDB()

// Middleware
app.use(express.json()); // Using built-in express.json() instead of body-parser

// Routes
app.use('/api/auth', authRoutes); // Authentication routes

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred', error: err.message });
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
