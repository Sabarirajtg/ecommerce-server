const express = require("express");
const ProductService = require("../services/ProductService");
const router = express.Router();

// Defining methods
router.post("/", ProductService.addProduct);

//get single 
router.get("/:id", ProductService.getProduct);


router.get("/", ProductService.getAllProducts);

module.exports = router;
