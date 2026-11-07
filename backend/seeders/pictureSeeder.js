// Links products to the photos in backend/images, matched by name.
//
//   node seeders/pictureSeeder.js           -> dry run, prints what would change
//   node seeders/pictureSeeder.js --apply   -> backs up products, then writes
//
// "Candy Floss.webp" matches "Candyfloss", "Midnight Kiss_.webp" matches
// "Midnight Kiss" and so on. Products without a matching file keep their picture.
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Product = require('../models/product');

const IMAGES_DIR = path.join(__dirname, '../images');
const BACKUP_DIR = path.join(__dirname, 'backups');
// Where the deployed backend serves backend/images
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || 'https://perfumery-2lhj.onrender.com/static';

const APPLY = process.argv.includes('--apply');

const titleKey = (title) => title.toLowerCase().replace(/[^a-z0-9]/g, '');

const run = async () => {
    await connectDB();
    console.log(`Database: ${mongoose.connection.name} @ ${mongoose.connection.host}`);
    console.log(APPLY ? 'MODE: APPLY (writing changes)\n' : 'MODE: DRY RUN (no changes written, use --apply)\n');

    const files = new Map(fs.readdirSync(IMAGES_DIR)
        .filter(f => /\.(webp|png|jpe?g)$/i.test(f))
        .map(f => [titleKey(path.parse(f).name), f]));

    const products = await Product.find();

    if (APPLY) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
        const backupFile = path.join(BACKUP_DIR, `products-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
        fs.writeFileSync(backupFile, JSON.stringify(products.map(p => p.toObject()), null, 2));
        console.log(`Backed up ${products.length} products to ${backupFile}\n`);
    }

    const used = new Set();
    let changed = 0;
    for (const product of products) {
        const file = files.get(titleKey(product.title));
        if (!file) continue;
        used.add(file);
        const picture = `${IMAGE_BASE_URL}/${file}`;
        if (product.picture === picture) continue;
        console.log(`${product.title}: ${product.picture} -> ${picture}`);
        if (APPLY) {
            product.picture = picture;
            await product.save();
        }
        changed++;
    }

    const unused = [...files.values()].filter(f => !used.has(f));
    if (unused.length) console.log(`\nImages with no matching product: ${unused.join(', ')}`);

    console.log(`\n${changed} pictures to update.${APPLY ? '' : ' (dry run)'}`);
    await mongoose.disconnect();
};

run().catch(async (err) => {
    console.error('Picture seeding failed:', err);
    await mongoose.disconnect();
    process.exit(1);
});
