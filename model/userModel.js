// import mongoose
const mongoose = require("mongoose");

// create schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  profile: {
    type: String,
  },
  address: {
    type: String,
  },
  savedMedicines: {
    type: Array,
  },
  savedPharmacies: {
    type: Array,
  },
  role: {
    type: String,
    enum: ["user", "assistant", "editor", "admin"],
    default: "user",
  },
});

const users = mongoose.model("users", userSchema);
module.exports = users;
