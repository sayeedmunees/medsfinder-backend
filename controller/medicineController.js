const medicines = require("../model/medicineModel");

// add medicine
exports.addMedicineController = async (req, res) => {
  console.log("Inside Add Medicine Controller");
  const { medicineName, genericName, brandName, category, description, price } =
    req.body;

  uploadedImg = [];
  req.files.map((item) => uploadedImg.push(item.filename));

  console.log(uploadedImg);

  const email = req.payload;
  console.log(email);

  try {
    const existingMedicine = await medicines.findOne({
      title,
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
        uploadedImg,
      });

      await newMedicine.save();
      res.status(200).json(newMedicine);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
