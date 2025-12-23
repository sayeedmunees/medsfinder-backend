// import mongoose
const mongoose = require("mongoose");

// create schema
const pharmacySchema = new mongoose.Schema({
  pharmacyName: {
    type: String,
    required: true,
  },
  pharmacyLocationName: {
    type: String,
    required: true,
    trim: true,
  },
  pharmacyContactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pharmacyStatus: {
    type: String,
    required: true,
    trim: true,
  },
  pharmacyLocationLink: {
    type: String,
    required: true,
    trim: true,
  },
  pharmacyRating: {
    type: String,
    required: true,
    trim: true,
  },
  pharmacyReviews: {
    type: String,
    required: true,
  },
  pharmacyImage: {
    type: String,
    required: true,
  },
  pharmacyMedicinesInStock: {
    type: Array,
    required: true,
  },
  pharmacyLattitude: {
    type: Number,
  },
  pharmacyLongitude: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

const pharmacies = mongoose.model("pharmacies", pharmacySchema);
module.exports = pharmacies;
