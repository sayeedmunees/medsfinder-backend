// import express
const express = require("express");
// import userController
const userController = require("./controller/userController.js");
const medicineController = require("./controller/medicineController.js");
const pharmacyController = require("./controller/pharmacyController.js");
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
  multerConfig.single("uploadedImg"),
  medicineController.addMedicineController
);

route.get(
  "/all-medicines",
  medicineController.getAllMedicinesController
);

// path for a book
route.get("/view-medicine/:id", medicineController.getAMedicinesController);

// path for search medicine
route.get("/search-medicines", medicineController.searchMedicineController);

// path for adding pharmacy
route.post(
  "/add-pharmacy",
  jwtAdminMiddleware,
  multerConfig.single("pharmacyImage"),
  pharmacyController.addPharmacyController
);

// path for getting all pharmacies
route.get("/all-pharmacies", pharmacyController.getAllPharmaciesController);

// routes export

module.exports = route;
