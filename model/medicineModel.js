// import mongoose
const mongoose = require("mongoose");

// create schema
const medicineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  noofpages: {
    type: Number,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dprice: {
    type: Number,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  uploadedImg: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  userMail: {
    type: String,
    required: true,
  },
  brought: {
    type: String,
    default: "",
  },
});

const medicines = mongoose.model("books", medicineSchema);
module.exports = medicines;
