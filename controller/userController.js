const users = require("../model/userModel");
const medicines = require("../model/medicineModel");
const pharmacies = require("../model/phramacyModel");
const products = require("../model/productModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// signup
exports.signUpController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(400).json("Existing User");
    } else {
      // Hash password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new users({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      
      // Sanitize user object for response
      const { password: _, ...userData } = newUser._doc;
      res.status(200).json(userData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// signin
exports.signInController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      // Verify password
      const validPassword = await bcrypt.compare(password, existingUser.password);
      if (validPassword) {
        const token = jwt.sign(
          { userMail: existingUser.email, role: existingUser.role },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        // Sanitize user object
        const { password: _, ...userData } = existingUser._doc;
        res.status(200).json({ existingUser: userData, token });
      } else {
        res.status(401).json("Incorrect Email/Password");
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
  const { idToken } = req.body;
  
  if (!process.env.GOOGLE_CLIENT_ID) {
    console.error("GOOGLE_CLIENT_ID is missing from .env");
    return res.status(500).json("Server Configuration Error");
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { name: username, email, picture: profile } = payload;

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      const token = jwt.sign(
        { userMail: existingUser.email, role: existingUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      const { password: _, ...userData } = existingUser._doc;
      res.status(200).json({ existingUser: userData, token });
    } else {
      const newUser = new users({
        username,
        email,
        password: "google_login_no_password", // Placeholder
        profile,
      });
      await newUser.save();
      const token = jwt.sign(
        { userMail: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      const { password: _, ...userData } = newUser._doc;
      res.status(200).json({ existingUser: userData, token });
    }
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(401).json("Invalid Google Token");
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