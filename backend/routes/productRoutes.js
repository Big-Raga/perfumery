const express = require("express");
const Router = express.Router();
const { getAllProducts, getFeaturedProducts, getProductByCategory, getProductById, getAllCategories } = require("../controllers/productController");


Router.get("/get-all-products", getAllProducts);
Router.get("/get-featured-products", getFeaturedProducts);
Router.get("/get-all-categories", getAllCategories);
Router.get("/category/:categoryId", getProductByCategory);
Router.get("/:productId", getProductById);



module.exports = Router;
