// import mongoose
const mongoose = require("mongoose");

// create schema
const medicineSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
    trim: true,
  },
  genericName: {
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
    type: Array,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const medicines = mongoose.model("medicines", medicineSchema);
module.exports = medicines;
