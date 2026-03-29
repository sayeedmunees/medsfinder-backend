// import express
const express = require("express");
// import userController
const userController = require("./controller/userController.js");
const medicineController = require("./controller/medicineController.js");
const pharmacyController = require("./controller/pharmacyController.js");
const productController = require("./controller/productController.js");
const { isAssistant, isEditor, isAdmin } = require("./middleware/roleMiddleware.js");
const jwtMiddleware = require("./middleware/jwtMiddleware.js");
const { uploadTo } = require("./middleware/multerMiddleware.js");
const { authLimiter, searchLimiter } = require("./middleware/rateLimitMiddleware.js");

// create instance
const route = new express.Router();

// path for signup
route.post("/signup", authLimiter, userController.signUpController);

// path for signin
route.post("/signin", authLimiter, userController.signInController);

// path for google signin
route.post("/google-signin", authLimiter, userController.googleSignInController);

// path for getting user details
route.get("/user/profile", jwtMiddleware, userController.getUserProfileController);

// path for updating user details
route.put(
  "/user/profile/update",
  jwtMiddleware,
  uploadTo("profile").single("profileImage"),
  userController.updateUserProfileController
);

// path for saving medicine
route.post("/user/save-medicine", jwtMiddleware, userController.toggleSavedMedicineController);

// path for saving pharmacy
route.post("/user/save-pharmacy", jwtMiddleware, userController.toggleSavedPharmacyController);

// path for getting saved items
route.get("/user/saved-items", jwtMiddleware, userController.getSavedItemsController);

// path for admin dashboard stats
route.get("/admin/dashboard-stats", isAssistant, userController.getAdminDashboardStatsController);

// path for updating admin profile (also support profile image if needed)
route.put(
  "/admin/update-profile",
  isAssistant,
  uploadTo("profile").single("profileImage"),
  userController.updateAdminProfileController
);

route.post(
  "/add-medicine",
  isAssistant,
  uploadTo("medicine").single("uploadedImg"),
  medicineController.addMedicineController
);

route.get("/all-medicines", medicineController.getAllMedicinesController);

// path for a book
route.get("/view-medicine/:id", medicineController.getAMedicinesController);

// path for search medicine
route.get("/search-medicines", searchLimiter, medicineController.searchMedicineController);

// path for update medicine
route.put(
  "/update-medicine/:id",
  isEditor,
  uploadTo("medicine").single("uploadedImg"),
  medicineController.updateMedicineController
);

// path for delete medicine
route.delete("/delete-medicine/:id", isAdmin, medicineController.deleteMedicineController);

// path for adding pharmacy
route.post(
  "/add-pharmacy",
  isAssistant,
  uploadTo("pharmacy").single("pharmacyImage"),
  pharmacyController.addPharmacyController
);

// path for update pharmacy
route.put(
  "/update-pharmacy/:id",
  isEditor,
  uploadTo("pharmacy").single("pharmacyImage"),
  pharmacyController.updatePharmacyController
);

// path for delete pharmacy
route.delete("/delete-pharmacy/:id", isAdmin, pharmacyController.deletePharmacyController);

// path for getting all pharmacies
route.get("/all-pharmacies", pharmacyController.getAllPharmaciesController);

// Product Admin Routes
route.post(
  "/add-product",
  isAssistant,
  uploadTo("advertisement").single("uploadedImg"),
  productController.addProductController
);

route.get("/all-products", productController.getAllProductsController);

route.put(
  "/update-product/:id",
  isEditor,
  uploadTo("advertisement").single("uploadedImg"),
  productController.updateProductController
);

route.delete("/delete-product/:id", isAdmin, productController.deleteProductController);

route.get("/view-product/:id", productController.viewProductController);
route.patch("/increment-product-clicks/:id", productController.incrementProductClicksController);

// routes export
module.exports = route;
