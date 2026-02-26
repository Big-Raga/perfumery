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

    
    const IMAGES_PATH = '/static';

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
        title: 'MILLIONARE',
        description: 'A bold and luxurious scent that exudes confidence and power. The warm spicy top notes ignite the senses, blending cinnamon and citrus for an invigorating opening. At the heart, amber, woody accords, and rose add depth, while animalic and green nuances create a rich, captivating character. Patchouli and leather bring a rugged elegance that lingers throughout. Perfect for the man who commands attention and embraces sophistication.',
        picture: `${BASE_URL}${IMAGES_PATH}/Millionare.webp`,
        rating: 5,
        price: 3500,
        category: mensCategory,
        notes: [
          { name: 'warm spicy', color: notesColorMap['warm spicy'] },
          { name: 'cinnamon', color: notesColorMap['cinnamon'] },
          { name: 'citrus', color: notesColorMap['citrus'] },
          { name: 'amber', color: notesColorMap['amber'] },
          { name: 'woody', color: notesColorMap['woody'] },
          { name: 'leather', color: notesColorMap['leather'] },
          { name: 'rose', color: notesColorMap['rose'] },
          { name: 'animalic', color: notesColorMap['animalic'] },
          { name: 'green', color: notesColorMap['green'] },
          { name: 'patchouli', color: notesColorMap['patchouli'] }
        ],
        stock: 100,
        featured: true
      },
      {
        title: 'SOPHISTICATED',
        description: 'An elegant and refined fragrance built for the modern gentleman. Fresh citrus and aromatic spices open with a crisp vibrancy, transitioning into a warm, woody core enriched with smoky and balsamic layers. Amber and fresh spicy undertones provide a classy richness, while green and aromatic accords balance boldness with finesse. Ideal for both day and evening wear, this scent reflects confidence with a smooth, polished finish.',
        picture: `${BASE_URL}${IMAGES_PATH}/Sophiticated.webp`,
        rating: 5,
        price: 4000,
        category: mensCategory,
        notes: [
          { name: 'citrus', color: notesColorMap['citrus'] },
          { name: 'woody', color: notesColorMap['woody'] },
          { name: 'fresh spicy', color: notesColorMap['fresh spicy'] },
          { name: 'aromatic', color: notesColorMap['aromatic'] },
          { name: 'amber', color: notesColorMap['amber'] },
          { name: 'smoky', color: notesColorMap['smoky'] },
          { name: 'balsamic', color: notesColorMap['balsamic'] },
          { name: 'warm spicy', color: notesColorMap['warm spicy'] },
          { name: 'green', color: notesColorMap['green'] },
          { name: 'fresh', color: notesColorMap['fresh'] }
        ],
        stock: 100,
        featured: true
      },
      {
        title: 'CORAL',
        description: 'A fresh, vibrant fragrance that embodies femininity and grace. Sparkling citrus and aquatic notes open with a bright, invigorating rush, leading into a bouquet of floral freshness and delicate rose. Subtle woody and fresh spicy accents add dimension, making it lively yet refined. Perfect for everyday elegance, Coral celebrates bright days and joyful moments.',
        picture: `${BASE_URL}${IMAGES_PATH}/Coral.webp`,
        rating: 5,
        price: 3500,
        category: womensCategory,
        notes: [
          { name: 'floral', color: notesColorMap['floral'] },
          { name: 'citrus', color: notesColorMap['citrus'] },
          { name: 'fresh', color: notesColorMap['fresh'] },
          { name: 'woody', color: notesColorMap['woody'] },
          { name: 'rose', color: notesColorMap['rose'] },
          { name: 'fresh spicy', color: notesColorMap['fresh spicy'] },
          { name: 'aquatic', color: notesColorMap['aquatic'] }
        ],
        stock: 100,
        featured: true
      },
      {
        title: 'STELLA',
        description: 'A serene and luminous scent inspired by ocean breezes and blooming gardens. Ozonic and aquatic notes create a refreshing, airy introduction, followed by white florals and soft rose at the heart. The result is a graceful harmony of freshness and floral purity, light yet memorable. Stella is perfect for women who love understated beauty with a touch of sophistication.',
        picture: `${BASE_URL}${IMAGES_PATH}/Stella.webp`,
        rating: 5,
        price: 3500,
        category: womensCategory,
        notes: [
          { name: 'aquatic', color: notesColorMap['aquatic'] },
          { name: 'floral', color: notesColorMap['floral'] },
          { name: 'white floral', color: notesColorMap['white floral'] },
          { name: 'fresh', color: notesColorMap['fresh'] },
          { name: 'ozonic', color: notesColorMap['ozonic'] },
          { name: 'rose', color: notesColorMap['rose'] }
        ],
        stock: 100,
        featured: true
      },
      {
        title: 'AQUA',
        description: 'A spirited and effervescent fragrance that evokes coastal elegance. Bright citrus and fruity accents open with joyful clarity, while aquatic and ozonic tones echo the freshness of the sea. Tender floral and white floral nuances add a feminine sweetness, with soft powdery and aromatic touches rounding out the experience. Aqua is your go-to for fresh, uplifting wear any time of day.',
        picture: `${BASE_URL}${IMAGES_PATH}/Aqua.webp`,
        rating: 5,
        price: 3500,
        category: womensCategory,
        notes: [
          { name: 'fresh', color: notesColorMap['fresh'] },
          { name: 'floral', color: notesColorMap['floral'] },
          { name: 'fruity', color: notesColorMap['fruity'] },
          { name: 'aquatic', color: notesColorMap['aquatic'] },
          { name: 'ozonic', color: notesColorMap['ozonic'] },
          { name: 'sweet', color: notesColorMap['sweet'] },
          { name: 'white floral', color: notesColorMap['white floral'] },
          { name: 'citrus', color: notesColorMap['citrus'] },
          { name: 'powdery', color: notesColorMap['powdery'] },
          { name: 'aromatic', color: notesColorMap['aromatic'] }
        ],
        stock: 100,
        featured: true
      },
      {
        title: 'AMEER UL OUD',
        description: 'A rich and seductive oriental fragrance that celebrates timeless luxury. Smooth woody richness and warm vanilla create an inviting opening, underpinned by a seductive sweetness. Earthy oud and powdery touches infuse depth, while lingering warmth makes this scent unforgettable. Ameer Ul Oud is perfect for evening wear and special occasions, for the man with an aristocratic edge.',
        picture: `${BASE_URL}${IMAGES_PATH}/Ameer ul Oudh.webp`,
        rating: 5,
        price: 4000,
        category: mensCategory,
        notes: [
          { name: 'woody', color: notesColorMap['woody'] },
          { name: 'vanilla', color: notesColorMap['vanilla'] },
          { name: 'sweet', color: notesColorMap['sweet'] },
          { name: 'oud', color: notesColorMap['oud'] },
          { name: 'powdery', color: notesColorMap['powdery'] }
        ],
        stock: 100,
        featured: true
      },
      {
        title: 'WOODY OUD',
        description: 'An opulent and robust scent crafted for those who love depth and character. Dominated by deep oud and earthy patchouli, this fragrance opens with a dense, musky warmth. Floral accents and amber soften the intensity, while woody, powdery, and warm spicy undertones add texture and complexity. A truly masculine signature scent, ideal for confident personalities and cooler nights.',
        picture: `${BASE_URL}${IMAGES_PATH}/Woody Oudh.webp`,
        rating: 5,
        price: 4000,
        category: mensCategory,
        notes: [
          { name: 'oud', color: notesColorMap['oud'] },
          { name: 'rose', color: notesColorMap['rose'] },
          { name: 'patchouli', color: notesColorMap['patchouli'] },
          { name: 'musky', color: notesColorMap['musky'] },
          { name: 'amber', color: notesColorMap['amber'] },
          { name: 'powdery', color: notesColorMap['powdery'] },
          { name: 'woody', color: notesColorMap['woody'] },
          { name: 'warm spicy', color: notesColorMap['warm spicy'] },
          { name: 'floral', color: notesColorMap['floral'] },
          { name: 'earthy', color: notesColorMap['earthy'] }
        ],
        stock: 100,
        featured: true
      }
    ];

    // Delete only duplicate products (products with the same title)
    const newTitles = productsData.map(p => p.title);
    const deleteResult = await Product.deleteMany({ title: { $in: newTitles } });
    console.log(`Deleted ${deleteResult.deletedCount} existing duplicate products`);

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
