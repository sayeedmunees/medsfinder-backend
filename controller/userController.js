const users = require("../model/userModel");
const medicines = require("../model/medicineModel");
const pharmacies = require("../model/phramacyModel");
const products = require("../model/productModel");
var jwt = require("jsonwebtoken");

// signup
exports.signUpController = async (req, res) => {
  // logic
  const { username, email, password } = req.body;
  console.log({ username, email, password });
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(400).json("Existing User");
    } else {
      const newUser = new users({
        username,
        email,
        password,
      });
      await newUser.save(); //mongodb save
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// signin
exports.signInController = async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      if (existingUser.password == password) {
        const token = jwt.sign({ userMail: existingUser.email, role: existingUser.role }, process.env.JWT_SECRET);
        res.status(200).json({ existingUser, token });
      } else {
        res.status(401).json("Incorrect Password");
      }
    } else {
      res.status(404).json("User doesn't exist");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// google signin
exports.googleSignInController = async (req, res) => {
  const { username, email, password, profile } = req.body;
  console.log(username, email, password, profile);

  try {
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      const token = jwt.sign({ userMail: existingUser.email, role: existingUser.role }, process.env.JWT_SECRET);
      res.status(200).json({ existingUser, token });
    } else {
      const newUser = new users({
        username,
        email,
        password,
        profile,
      });
      await newUser.save();
      const token = jwt.sign({ userMail: newUser.email, role: newUser.role }, process.env.JWT_SECRET);
      res.status(200).json({ existingUser: newUser, token });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
// get user profile
exports.getUserProfileController = async (req, res) => {
  const userMail = req.payload;
  try {
    const existingUser = await users.findOne({ email: userMail });
    if (existingUser) {
        // Exclude password from response
        const { password, ...rest } = existingUser._doc;
        res.status(200).json(rest);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// update user profile
exports.updateUserProfileController = async (req, res) => {
  const userMail = req.payload;
  const { username, phone, address } = req.body;
  
  try {
    const updatedUser = await users.findOneAndUpdate(
      { email: userMail },
      {
        username,
        phone,
        address
      },
      { new: true }
    );
    await updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
      console.log(err);
    res.status(500).json(err);
  }
};

// toggle saved medicine
exports.toggleSavedMedicineController = async (req, res) => {
  const userMail = req.payload;
  const { medicineId } = req.body;
  try {
    const user = await users.findOne({ email: userMail });
    if (user.savedMedicines.includes(medicineId)) {
      await users.findOneAndUpdate(
        { email: userMail },
        { $pull: { savedMedicines: medicineId } }
      );
      res.status(200).json("Medicine Removed from Saved List");
    } else {
      await users.findOneAndUpdate(
        { email: userMail },
        { $addToSet: { savedMedicines: medicineId } }
      );
      res.status(200).json("Medicine Added to Saved List");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// toggle saved pharmacy
exports.toggleSavedPharmacyController = async (req, res) => {
  const userMail = req.payload;
  const { pharmacyId } = req.body;
  try {
    const user = await users.findOne({ email: userMail });
    if (user.savedPharmacies.includes(pharmacyId)) {
      await users.findOneAndUpdate(
        { email: userMail },
        { $pull: { savedPharmacies: pharmacyId } }
      );
      res.status(200).json("Pharmacy Removed from Saved List");
    } else {
      await users.findOneAndUpdate(
        { email: userMail },
        { $addToSet: { savedPharmacies: pharmacyId } }
      );
      res.status(200).json("Pharmacy Added to Saved List");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get saved items
exports.getSavedItemsController = async (req, res) => {
  const userMail = req.payload;
  try {
    const user = await users.findOne({ email: userMail });
    if (user) {
      const savedMedicines = await medicines.find({
        _id: { $in: user.savedMedicines },
      });
      const savedPharmacies = await pharmacies.find({
        _id: { $in: user.savedPharmacies },
      });
      res.status(200).json({ savedMedicines, savedPharmacies });
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// get admin dashboard stats
exports.getAdminDashboardStatsController = async (req, res) => {
  try {
    const medicineCount = await medicines.countDocuments();
    const pharmacyCount = await pharmacies.countDocuments();
    const productCount = await products.countDocuments();
    const userCount = await users.countDocuments();

    res.status(200).json({
      medicineCount,
      pharmacyCount,
      productCount,
      userCount,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// update admin profile
exports.updateAdminProfileController = async (req, res) => {
  const userMail = req.payload;
  const { username, password } = req.body;

  try {
    const updateData = { username };
    if (password) {
      updateData.password = password;
    }

    const updatedAdmin = await users.findOneAndUpdate(
      { email: userMail },
      updateData,
      { new: true }
    );

    if (updatedAdmin) {
      const { password, ...rest } = updatedAdmin._doc;
      res.status(200).json(rest);
    } else {
      res.status(404).json("Admin not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};