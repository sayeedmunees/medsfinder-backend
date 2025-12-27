// import mongoose
const mongoose = require("mongoose");

// create schema
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  
  brandName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  uploadedImg: {
    type: String,
    required: true,
  },
  totalClicks: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: { type: Date, default: Date.now },
});

const products = mongoose.model("products", productSchema);
module.exports = products;
