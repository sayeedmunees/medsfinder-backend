// import express
const express = require("express");
// import userController
const userController = require("./controller/userController.js");
const medicineController = require("./controller/medicineController.js");
const pharmacyController = require("./controller/pharmacyController.js");
const productController = require("./controller/productController.js");
const jwtAdminMiddleware = require("./middleware/jwtAdminMiddleware.js");
const jwtMiddleware = require("./middleware/jwtMiddleware.js");
const multerConfig = require("./middleware/multerMiddleware.js");

// create instance
const route = new express.Router();

// path for signup
route.post("/signup", userController.signUpController);

// path for signin
route.post("/signin", userController.signInController);

// path for google signin
route.post("/google-signin", userController.googleSignInController);

// path for getting user details
route.get("/user/profile", jwtMiddleware, userController.getUserProfileController);

// path for updating user details
route.put("/user/profile/update", jwtMiddleware, userController.updateUserProfileController);

// path for saving medicine
route.post("/user/save-medicine", jwtMiddleware, userController.toggleSavedMedicineController);

// path for saving pharmacy
route.post("/user/save-pharmacy", jwtMiddleware, userController.toggleSavedPharmacyController);

// path for getting saved items
route.get("/user/saved-items", jwtMiddleware, userController.getSavedItemsController);

// path for admin dashboard stats
route.get("/admin/dashboard-stats", jwtAdminMiddleware, userController.getAdminDashboardStatsController);

// path for updating admin profile
route.put("/admin/update-profile", jwtAdminMiddleware, userController.updateAdminProfileController);



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

// path for update medicine
route.put(
  "/update-medicine/:id",
  jwtAdminMiddleware,
  multerConfig.single("uploadedImg"),
  medicineController.updateMedicineController
);

// path for delete medicine
route.delete(
  "/delete-medicine/:id",
  jwtAdminMiddleware,
  medicineController.deleteMedicineController
);

// path for adding pharmacy
route.post(
  "/add-pharmacy",
  jwtAdminMiddleware,
  multerConfig.single("pharmacyImage"),
  pharmacyController.addPharmacyController
);

// path for update pharmacy
route.put(
  "/update-pharmacy/:id",
  jwtAdminMiddleware,
  multerConfig.single("pharmacyImage"),
  pharmacyController.updatePharmacyController
);

// path for delete pharmacy
route.delete(
  "/delete-pharmacy/:id",
  jwtAdminMiddleware,
  pharmacyController.deletePharmacyController
);

// path for getting all pharmacies
route.get("/all-pharmacies", pharmacyController.getAllPharmaciesController);

// Product Admin Routes
route.post(
  "/add-product",
  jwtAdminMiddleware,
  multerConfig.single("uploadedImg"),
  productController.addProductController
);

route.get("/all-products", productController.getAllProductsController);

route.put(
  "/update-product/:id",
  jwtAdminMiddleware,
  multerConfig.single("uploadedImg"),
  productController.updateProductController
);

route.delete(
  "/delete-product/:id",
  jwtAdminMiddleware,
  productController.deleteProductController
);

route.get("/view-product/:id", productController.viewProductController);
route.patch("/increment-product-clicks/:id", productController.incrementProductClicksController);

// routes export
module.exports = route;
