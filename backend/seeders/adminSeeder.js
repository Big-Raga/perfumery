require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const admin = require('../models/admin');

const seedAdmin = async () => {
  try {
    await connectDB();
    
    const existingAdmin = await admin.findOne({ email: 'umair.shakoor10@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const newAdmin = new admin({
      email: 'umair.shakoor10@gmail.com',
      username: 'admin'
    });

    await newAdmin.save();
    console.log('Admin added successfully:', newAdmin.email);
    process.exit(0);

  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
