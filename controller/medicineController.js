const medicines = require("../model/medicineModel");

// add medicine
exports.addMedicineController = async (req, res) => {
  console.log("Inside Add Medicine Controller");
  const {
    medicineName,
    genericName,
    brandName,
    category,
    description,
    price,
    uploadedImg,
  } = req.body;

  const uploadedImage = req.file.filename;
  console.log(uploadedImage);

  const email = req.payload;
  console.log(email);

  try {
    const existingMedicine = await medicines.findOne({
      medicineName,
      userMail: email,
    });

    if (existingMedicine) {
      res.status(401).json("Medicine already exists");
    } else {
      const newMedicine = new medicines({
        medicineName,
        genericName,
        brandName,
        category,
        description,
        price,
        uploadedImg : uploadedImage,
      });

      await newMedicine.save();
      res.status(200).json(newMedicine);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// view all medicines
exports.getAllMedicinesController = async (req, res) => {
  console.log("Inside get All Medicines Controller");
  try {
    const allMedicines = await medicines.find();
    res.status(200).json(allMedicines);
  } catch (err) {
    res.status(500).json(err);
  }
};

// to get a medicines
exports.getAMedicinesController = async (req, res) => {
  console.log("inside get A Medicines Controller");

  const { id } = req.params;
  console.log(id);

  try {
    const aMedicine = await medicines.findOne({ _id: id });
    res.status(200).json(aMedicine);
  } catch (err) {
    res.status(500).json(err);
  }
};

// search medicines
exports.searchMedicineController = async (req, res) => {
  const { search } = req.query;
  console.log("Search term:", search);
  try {
    const query = {
      $or: [
        { medicineName: { $regex: search, $options: "i" } },
        { genericName: { $regex: search, $options: "i" } },
      ],
    };
    const searchResults = await medicines.find(query);
    res.status(200).json(searchResults);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};