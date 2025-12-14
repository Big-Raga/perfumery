const Product = require("../models/product")
const Category = require("../models/category")

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().select("_id title picture price category rating").populate("category");
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ featured: true }).select("_id title picture price category rating").populate("category");
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getProductByCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        console.log(`Fetching products for category ID: ${categoryId}`);
        console.log(`all categories in DB:` + await Category.find({}));
        const products = await Product.find({ category: categoryId }).select("_id title picture price category rating").populate("category");
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().select("_id name description");
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const foundProduct = await Product.findById(productId)
            .populate("category")
            .populate("Type");
        if (!foundProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(foundProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}


module.exports = {
    getAllProducts,
    getFeaturedProducts,
    getProductByCategory,
    getProductById,
    getAllCategories
};
