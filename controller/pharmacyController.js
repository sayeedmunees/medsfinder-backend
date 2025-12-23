const pharmacies = require("../model/phramacyModel");

// add pharmacy
exports.addPharmacyController = async (req, res) => {
  console.log("Inside Add Pharmacy Controller");
  const {
    pharmacyName,
    pharmacyLocationName,
    pharmacyContactNumber,
    pharmacyStatus,
    pharmacyLocationLink,
    pharmacyRating,
    pharmacyReviews,
    pharmacyMedicinesInStock,
  } = req.body;

  const pharmacyImage = req.file.filename;

  // process medicines stock: split by comma and trim
  const medicinesArray = pharmacyMedicinesInStock
    ? pharmacyMedicinesInStock.split(",").map((med) => med.trim())
    : [];

  try {
    const existingPharmacy = await pharmacies.findOne({
      pharmacyName,
      pharmacyLocationName,
    });

    if (existingPharmacy) {
      res.status(406).json("Pharmacy already exists");
    } else {
      const newPharmacy = new pharmacies({
        pharmacyName,
        pharmacyLocationName,
        pharmacyContactNumber,
        pharmacyStatus,
        pharmacyLocationLink,
        pharmacyRating,
        pharmacyReviews: pharmacyReviews || "0", // Default if not provided
        pharmacyMedicinesInStock: medicinesArray,
        pharmacyImage,
      });

      await newPharmacy.save();
      res.status(200).json(newPharmacy);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// update pharmacy
exports.updatePharmacyController = async (req, res) => {
  console.log("Inside Update Pharmacy Controller");
  const { id } = req.params;
  const {
    pharmacyName,
    pharmacyLocationName,
    pharmacyContactNumber,
    pharmacyStatus,
    pharmacyLocationLink,
    pharmacyRating,
    pharmacyReviews,
    pharmacyMedicinesInStock,
    pharmacyImage,
  } = req.body;

  const uploadImage = req.file ? req.file.filename : pharmacyImage;

   // process medicines stock: split by comma and trim
   const medicinesArray = pharmacyMedicinesInStock
   ? pharmacyMedicinesInStock.split(",").map((med) => med.trim())
   : [];

  try {
    const updatePharmacy = await pharmacies.findByIdAndUpdate(
      { _id: id },
      {
        pharmacyName,
        pharmacyLocationName,
        pharmacyContactNumber,
        pharmacyStatus,
        pharmacyLocationLink,
        pharmacyRating,
        pharmacyReviews,
        pharmacyMedicinesInStock: medicinesArray,
        pharmacyImage: uploadImage,
      },
      { new: true }
    );
    await updatePharmacy.save();
    res.status(200).json(updatePharmacy);
  } catch (err) {
    res.status(401).json(err);
  }
};

// delete pharmacy
exports.deletePharmacyController = async (req, res) => {
  console.log("Inside Delete Pharmacy Controller");
  const { id } = req.params;
  try {
    const removePharmacy = await pharmacies.findByIdAndDelete({ _id: id });
    res.status(200).json(removePharmacy);
  } catch (err) {
    res.status(401).json(err);
  }
};

// get all pharmacies
exports.getAllPharmaciesController = async (req, res) => {
  console.log("Inside Get All Pharmacies Controller");
  try {
    const allPharmacies = await pharmacies.find();
    res.status(200).json(allPharmacies);
  } catch (err) {
    res.status(500).json(err);
  }
};
