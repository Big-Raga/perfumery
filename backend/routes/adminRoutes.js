const express = require("express");
const Router = express.Router();
const { LoginAdmin, verifyOTP, LogoutAdmin } = require("../controllers/admin/adminLoginController");
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

// Authentication routes
Router.post("/login-admin", LoginAdmin);
Router.post("/verify-otp", verifyOTP);
Router.post("/logout", LogoutAdmin);

// Product management routes
Router.get("/products", getAllProductsAdmin);
Router.get("/products/:id", getProductByIdAdmin);
Router.post("/products", createProduct);
Router.put("/products/:id", updateProduct);
Router.delete("/products/:id", deleteProduct);

// Categories route
Router.get("/categories", getAllCategories);

// Types routes
Router.get("/types", getAllTypes);
Router.post("/types", createType);

module.exports = Router;