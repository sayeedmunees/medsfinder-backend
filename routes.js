// import express
const express = require("express");
// import userController
const userController = require("./controller/userController.js");
const medicineController = require("./controller/medicineController.js");
const jwtAdminMiddleware = require("./middleware/jwtAdminMiddleware.js");
const multerConfig = require("./middleware/multerMiddleware.js");

// create instance
const route = new express.Router();

// path for signup
route.post("/signup", userController.signUpController);

// path for signin
route.post("/signin", userController.signInController);

// path for google signin
route.post("/google-signin", userController.googleSignInController);


// ------ADMIN------------------------
route.post(
  "/add-medicine",
  jwtAdminMiddleware,
  multerConfig.array("uploadedImg", 1),
  medicineController.addMedicineController
);

// routes export
module.exports = route;
