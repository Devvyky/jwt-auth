const express = require("express");
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");

const router = express.Router();

// GET /api/v1/product/all
router.get("/all", productController.getAllProducts);

// GET /api/v1/product/user/all
router.get("/user/all", auth, productController.getAllUserProducts);

// PUT /api/v1/product/update/:id
router.put("/update/:id", auth, productController.updateProduct);

// POST /api/v1/product/create
router.post("/create", auth, productController.createProduct);

module.exports = router;
