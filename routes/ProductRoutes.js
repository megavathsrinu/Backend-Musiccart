const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getSelectedProduct,
  createProduct,
} = require("../Controllers/Products");

router.route("/new").post(createProduct)

router.route("/").get(getAllProducts);

router.route("/:id").get(getSelectedProduct);

module.exports = router;
