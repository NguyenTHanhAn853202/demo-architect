const express = require("express");
const { createProduct, getProducts, getProductDetail, getAllProducts } = require("../controllers/product.controller");
const router = express.Router();

router.post("/", createProduct);
router.get("/:key", getProducts);
router.get("/detail/:id", getProductDetail);

module.exports = router;
