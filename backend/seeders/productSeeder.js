require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Product = require('../models/product');
const Category = require('../models/category');
const notesColorMap = require('../config/notesConfig');

const seedProducts = async () => {
  try {
    await connectDB();

    // Get the base URL from environment or use default
    // const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
    const BASE_URL = process.env.VITE_BACKEND_URL;

    
    const STATIC_PATH = '/static';

    // Fetch all existing categories
    const allCategories = await Category.find({});
    
    // Map category names to their IDs
    const categoryMap = {};
    allCategories.forEach(cat => {
      categoryMap[cat.name.toLowerCase()] = cat._id;
    });

    // Get the correct category IDs
    const mensCategory = categoryMap["men's fragrances"] || categoryMap["mens"];
    const womensCategory = categoryMap["women's fragrances"] || categoryMap["womens"];

    if (!mensCategory || !womensCategory) {
      console.error('Required categories not found in database');
      console.log('Available categories:', Object.keys(categoryMap));
      process.exit(1);
    }

    const productsData = [
      {
        title: 'Abdullah',
        description: 'A woody and aromatic fragrance with fresh spicy notes',
        picture: `${BASE_URL}${STATIC_PATH}/Abdullah.png`,
        rating: 5,
        price: 3500,
        category: mensCategory,
        notes: [
          { name: 'woody', color: notesColorMap['woody'] },
          { name: 'aromatic', color: notesColorMap['aromatic'] },
          { name: 'conifer', color: notesColorMap['conifer'] },
          { name: 'fresh spicy', color: notesColorMap['fresh spicy'] },
          { name: 'lavender', color: notesColorMap['lavender'] },
          { name: 'fresh', color: notesColorMap['fresh'] },
          { name: 'green', color: notesColorMap['green'] },
          { name: 'fruity', color: notesColorMap['fruity'] }
        ],
        inStock: true,
        stock: 100,
        featured: true
      },
      {
        title: 'Abeeha',
        description: 'A sweet and lavender-based women\'s fragrance',
        picture: `${BASE_URL}${STATIC_PATH}/Abeeha.png`,
        rating: 5,
        price: 3000,
        category: womensCategory,
        notes: [
          { name: 'vanilla', color: notesColorMap['vanilla'] },
          { name: 'lavender', color: notesColorMap['lavender'] },
          { name: 'fresh spicy', color: notesColorMap['fresh spicy'] },
          { name: 'cacao', color: notesColorMap['cacao'] },
          { name: 'sweet', color: notesColorMap['sweet'] }
        ],
        inStock: true,
        stock: 100,
        featured: true
      },
      {
        title: 'Wali',
        description: 'A fruity and aromatic men\'s fragrance with citrus and woody notes',
        picture: `${BASE_URL}${STATIC_PATH}/Wali.png`,
        rating: 5,
        price: 3000,
        category: mensCategory,
        notes: [
          { name: 'fruity', color: notesColorMap['fruity'] },
          { name: 'sweet', color: notesColorMap['sweet'] },
          { name: 'aromatic', color: notesColorMap['aromatic'] },
          { name: 'lavender', color: notesColorMap['lavender'] },
          { name: 'fresh spicy', color: notesColorMap['fresh spicy'] },
          { name: 'citrus', color: notesColorMap['citrus'] },
          { name: 'woody', color: notesColorMap['woody'] },
          { name: 'vanilla', color: notesColorMap['vanilla'] },
          { name: 'herbal', color: notesColorMap['herbal'] },
          { name: 'fresh', color: notesColorMap['fresh'] }
        ],
        inStock: true,
        stock: 100,
        featured: true
      },
      {
        title: 'Tempter',
        description: 'A sophisticated men\'s fragrance with vanilla and tobacco notes',
        picture: `${BASE_URL}${STATIC_PATH}/Tempter.png`,
        rating: 5,
        price: 3500,
        category: mensCategory,
        notes: [
          { name: 'vanilla', color: notesColorMap['vanilla'] },
          { name: 'sweet', color: notesColorMap['sweet'] },
          { name: 'honey', color: notesColorMap['honey'] },
          { name: 'aromatic', color: notesColorMap['aromatic'] },
          { name: 'amber', color: notesColorMap['amber'] },
          { name: 'lavender', color: notesColorMap['lavender'] },
          { name: 'tobacco', color: notesColorMap['tobacco'] },
          { name: 'green', color: notesColorMap['green'] },
          { name: 'fresh spicy', color: notesColorMap['fresh spicy'] },
          { name: 'powdery', color: notesColorMap['powdery'] }
        ],
        inStock: true,
        stock: 100,
        featured: true
      },
      {
        title: 'Abrish',
        description: 'A sweet and vanilla-based women\'s fragrance',
        picture: `${BASE_URL}${STATIC_PATH}/Abrish.png`,
        rating: 5,
        price: 3000,
        category: womensCategory,
        notes: [
          { name: 'vanilla', color: notesColorMap['vanilla'] },
          { name: 'lavender', color: notesColorMap['lavender'] },
          { name: 'fresh spicy', color: notesColorMap['fresh spicy'] },
          { name: 'cacao', color: notesColorMap['cacao'] },
          { name: 'sweet', color: notesColorMap['sweet'] }
        ],
        inStock: true,
        stock: 100,
        featured: true
      }
    ];

    // Delete all existing products
    const deleteResult = await Product.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing products`);

    // Insert products
    const createdProducts = await Product.insertMany(productsData);
    console.log(`${createdProducts.length} products added successfully`);
    console.log(`Using BASE_URL: ${BASE_URL}`);
    
    createdProducts.forEach(product => {
      console.log(`✓ ${product.title} - ${product.price} Rs - Image: ${product.picture}`);
    });

    process.exit(0);

  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
