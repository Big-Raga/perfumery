// Imports the perfume and oud catalogue from the CSVs in the repo root.
//
//   node seeders/catalogSeeder.js           -> dry run, prints what would change
//   node seeders/catalogSeeder.js --apply   -> backs up products, then writes
//
// Existing products are matched by title and updated in place (picture, rating,
// reviews and stock are kept). Products not in the CSVs are deleted with their
// reviews. Only the featured products listed below are featured.
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Product = require('../models/product');
const Category = require('../models/category');
const Review = require('../models/review');
const notesColorMap = require('../config/notesConfig');

const ROOT = path.join(__dirname, '../..');
const PERFUME_CSV = path.join(ROOT, 'house_of_oud_perfume_with_notes.csv');
const OUD_CSV = path.join(ROOT, 'house_of_oud_oud.csv');
const BACKUP_DIR = path.join(__dirname, 'backups');

const FEATURED = ['tolipeer', 'velvet'];
// Shown until a real photo is uploaded via the admin panel (served by the frontend)
const PLACEHOLDER_PICTURE = '/logo.webp';
const DEFAULT_STOCK = 100;
// CSV name -> existing DB title, where the spelling differs
const TITLE_ALIASES = { millionaire: 'millionare' };

const APPLY = process.argv.includes('--apply');

// Minimal CSV parser (handles quoted fields with commas)
const parseCSV = (file) => {
    const text = fs.readFileSync(file, 'utf8').replace(/^﻿/, '');
    const rows = [];
    let row = [], field = '', inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (inQuotes) {
            if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
            else if (c === '"') inQuotes = false;
            else field += c;
        } else if (c === '"') inQuotes = true;
        else if (c === ',') { row.push(field); field = ''; }
        else if (c === '\n' || c === '\r') {
            if (c === '\r' && text[i + 1] === '\n') i++;
            row.push(field); field = '';
            if (row.some(f => f.trim())) rows.push(row);
            row = [];
        } else field += c;
    }
    row.push(field);
    if (row.some(f => f.trim())) rows.push(row);
    const [header, ...data] = rows;
    return data.map(r => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] || '').trim()])));
};

const titleKey = (title) => title.toLowerCase().replace(/[^a-z0-9]/g, '');

const toNotes = (names) => names
    .map(n => n.trim().toLowerCase())
    .filter(Boolean)
    .map(name => ({ name, color: notesColorMap[name] || '#E0E0E0' }));

const buildCatalog = () => {
    const perfumes = parseCSV(PERFUME_CSV).map(r => ({
        title: r['Perfume Name'],
        price: Number(r['Price (PKR, 50ml)']),
        productLine: 'perfume',
        range: r['Range'].toLowerCase(),
        gender: r['Collection'].toLowerCase(),
        impression: r['Impression'] || undefined,
        description: r['Description'] || undefined,
        notes: toNotes(Object.keys(r).filter(k => k.startsWith('Key Note')).map(k => r[k])),
    }));
    const ouds = parseCSV(OUD_CSV).map(r => ({
        title: r['Oud Name'],
        price: Number(r['Price (PKR, 50ml)']),
        productLine: 'oud',
        range: null,
        gender: null,
        notes: [],
    }));
    return [...perfumes, ...ouds];
};

const run = async () => {
    await connectDB();
    console.log(`Database: ${mongoose.connection.name} @ ${mongoose.connection.host}`);
    console.log(APPLY ? 'MODE: APPLY (writing changes)\n' : 'MODE: DRY RUN (no changes written, use --apply)\n');

    const catalog = buildCatalog();
    for (const item of catalog) {
        if (!['classic', 'premium', null].includes(item.range) || !['men', 'women', null].includes(item.gender) || !item.price) {
            throw new Error(`Invalid CSV row: ${JSON.stringify(item)}`);
        }
    }

    // Legacy categories, so clients that still filter by category keep working
    const categories = await Category.find({ name: { $in: ["Men's Fragrances", "Women's Fragrances"] } });
    const legacyCategory = {
        men: categories.find(c => c.name === "Men's Fragrances")?._id,
        women: categories.find(c => c.name === "Women's Fragrances")?._id,
    };

    const existing = await Product.find();
    const byTitle = new Map(existing.map(p => [titleKey(p.title), p]));

    if (APPLY) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
        const backupFile = path.join(BACKUP_DIR, `products-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
        fs.writeFileSync(backupFile, JSON.stringify(existing.map(p => p.toObject()), null, 2));
        console.log(`Backed up ${existing.length} products to ${backupFile}\n`);
    }

    const matched = new Set();
    let created = 0, updated = 0;

    for (const item of catalog) {
        const key = titleKey(item.title);
        const product = byTitle.get(key) || byTitle.get(TITLE_ALIASES[key]);
        const fields = {
            title: item.title,
            price: item.price,
            productLine: item.productLine,
            range: item.range,
            gender: item.gender,
            featured: FEATURED.includes(key),
        };
        if (item.impression) fields.impression = item.impression;
        if (item.description) fields.description = item.description;
        if (item.notes.length) fields.notes = item.notes;
        if (item.gender && legacyCategory[item.gender]) fields.category = legacyCategory[item.gender];

        const label = `${item.title} [${[item.productLine, item.range, item.gender].filter(Boolean).join(' / ')}]${fields.featured ? ' *featured*' : ''}`;
        if (product) {
            matched.add(product._id.toString());
            const changes = Object.keys(fields).filter(f => JSON.stringify(product.toObject()[f]) !== JSON.stringify(fields[f])
                && !(f === 'notes' && JSON.stringify(product.notes.map(n => ({ name: n.name, color: n.color }))) === JSON.stringify(fields.notes)));
            console.log(`UPDATE ${label} (was "${product.title}"): ${changes.join(', ') || 'no changes'}`);
            if (APPLY && changes.length) {
                product.set(fields);
                await product.save();
            }
            updated++;
        } else {
            console.log(`CREATE ${label} - Rs ${item.price}, ${item.notes.length} notes`);
            if (APPLY) {
                await Product.create({ ...fields, picture: PLACEHOLDER_PICTURE, stock: DEFAULT_STOCK });
            }
            created++;
        }
    }

    // The CSVs are the full catalogue: anything else is removed, along with its reviews
    const unlisted = existing.filter(p => !matched.has(p._id.toString()));
    for (const p of unlisted) {
        const reviewCount = await Review.countDocuments({ product: p._id });
        console.log(`DELETE ${p.title} (not in CSVs)${reviewCount ? `, with ${reviewCount} reviews` : ''}`);
        if (APPLY) {
            await Review.deleteMany({ product: p._id });
            await p.deleteOne();
        }
    }

    const uncoloured = [...new Set(catalog.flatMap(i => i.notes).filter(n => n.color === '#E0E0E0').map(n => n.name))];
    if (uncoloured.length) console.log(`\nNotes without a colour in notesConfig: ${uncoloured.join(', ')}`);

    console.log(`\n${created} to create, ${updated} to update, ${unlisted.length} to delete.${APPLY ? '' : ' (dry run)'}`);
    await mongoose.disconnect();
};

run().catch(async (err) => {
    console.error('Catalog seeding failed:', err);
    await mongoose.disconnect();
    process.exit(1);
});
