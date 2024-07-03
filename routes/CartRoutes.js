const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeCartItems,
} = require("../Controllers/Cart");
const VerifyAuthentication = require("../Middlewares/VerifyAuthentication");

router.route("/add-to-cart").post(addToCart);

router.route("/get-cartitems/:id").get(getCartItems);

router.route("/clear-cartitems").delete(removeCartItems);

module.exports = router;
