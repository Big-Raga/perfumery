require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/database');

const app = express();

// Connect to MongoDB
connectDB();

// serve images
app.use(
  '/static',
  express.static(path.join(__dirname, 'images'))
);



// Middleware
app.use(cors({
  // origin: process.env.FRONTEND_URL || 'https://http://localhost:5173', // Your frontend URL from
  origin: process.env.FRONTEND_URL || 'https://www.houseofouds.com', // Your frontend URL from env

  credentials: true // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());

//server port
const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/images', require('./routes/imageRoutes'));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});


app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});


