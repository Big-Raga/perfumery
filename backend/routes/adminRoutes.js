const express = require("express");
const Router = express.Router();
const { LoginAdmin, verifyOTP, LogoutAdmin } = require("../controllers/admin/adminLoginController");
const AuthMiddleware = require("../middleware/authMiddleware");
const {
    getAllProductsAdmin,
    getProductByIdAdmin,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllCategories,
    getAllTypes,
    createType
} = require("../controllers/admin/adminProductController");

// Authentication routes (no middleware needed)
Router.post("/login-admin", LoginAdmin);
Router.post("/verify-otp", verifyOTP);
Router.post("/logout", LogoutAdmin);

// Protected product management routes
Router.get("/products", AuthMiddleware, getAllProductsAdmin);
Router.get("/products/:id", AuthMiddleware, getProductByIdAdmin);
Router.post("/products", AuthMiddleware, createProduct);
Router.put("/products/:id", AuthMiddleware, updateProduct);
Router.delete("/products/:id", AuthMiddleware, deleteProduct);

// Protected categories route
Router.get("/categories", AuthMiddleware, getAllCategories);

// Protected types routes
Router.get("/types", AuthMiddleware, getAllTypes);
Router.post("/types", AuthMiddleware, createType);

module.exports = Router;