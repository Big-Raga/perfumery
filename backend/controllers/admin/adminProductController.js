const Product = require("../../models/product");
const Category = require("../../models/category");
const Type = require("../../models/Type");

// Get all products for admin (with full details)
const getAllProductsAdmin = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category")
            .populate("Type");
        res.status(200).json({
            data: products,
            message: "Products retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Server error"
        });
    }
};

// Get single product by ID
const getProductByIdAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
            .populate("category")
            .populate("Type");

        if (!product) {
            return res.status(404).json({
                data: null,
                message: "Product not found"
            });
        }

        res.status(200).json({
            data: product,
            message: "Product retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Server error"
        });
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            picture,
            price,
            category,
            notes,
            Type,
            stock,
            featured
        } = req.body;

        // Validate required fields
        if (!title || !picture || !price || !stock) {
            return res.status(400).json({
                data: null,
                message: "Missing required fields: title, picture, price, stock"
            });
        }

        // Create new product
        const newProduct = new Product({
            title,
            description,
            picture,
            price,
            category,
            notes,
            Type,
            stock,
            featured: featured || false
        });

        await newProduct.save();
        await newProduct.populate(["category", "Type"]);

        res.status(201).json({
            data: newProduct,
            message: "Product created successfully"
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Server error"
        });
    }
};

// Update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Remove empty string fields that are ObjectId refs
        if (updateData.category === '') delete updateData.category;
        if (updateData.Type === '') delete updateData.Type;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).populate(["category", "Type"]);

        if (!updatedProduct) {
            return res.status(404).json({
                data: null,
                message: "Product not found"
            });
        }

        res.status(200).json({
            data: updatedProduct,
            message: "Product updated successfully"
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({
            data: null,
            message: error.message || "Server error"
        });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                data: null,
                message: "Product not found"
            });
        }

        res.status(200).json({
            data: null,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Server error"
        });
    }
};

// Get all categories for dropdown
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            data: categories,
            message: "Categories retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Server error"
        });
    }
};

// Get all types for dropdown
const getAllTypes = async (req, res) => {
    try {
        const types = await Type.find();
        res.status(200).json({
            data: types,
            message: "Types retrieved successfully"
        });
    } catch (error) {
        res.status(500).json({
            data: null,
            message: "Server error"
        });
    }
};

// Create new type
const createType = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                data: null,
                message: "Type name is required"
            });
        }

        const newType = new Type({ name });
        await newType.save();

        res.status(201).json({
            data: newType,
            message: "Type created successfully"
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                data: null,
                message: "Type name already exists"
            });
        } else {
            res.status(500).json({
                data: null,
                message: "Server error"
            });
        }
    }
};

module.exports = {
    getAllProductsAdmin,
    getProductByIdAdmin,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllCategories,
    getAllTypes,
    createType
};