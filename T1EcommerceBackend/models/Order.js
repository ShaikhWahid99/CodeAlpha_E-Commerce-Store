const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  city: String,
  postalCode: String,
  cartItems: Array,
  totalPrice: Number,
});

module.exports = mongoose.model("Order", orderSchema);
