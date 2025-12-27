const products = require("../model/productModel");

// add product
exports.addProductController = async (req, res) => {
  console.log("Inside Add Product Controller");
  const { productName, brandName, category, description, price } = req.body;
  const uploadedImage = req.file ? req.file.filename : null;

  if (!uploadedImage) {
    return res.status(401).json("Product image is required");
  }

  try {
    const existingProduct = await products.findOne({ productName });

    if (existingProduct) {
      res.status(401).json("Product already exists");
    } else {
      const newProduct = new products({
        productName,
        brandName,
        category,
        description,
        price,
        uploadedImg: uploadedImage,
      });

      await newProduct.save();
      res.status(200).json(newProduct);
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// get all products
exports.getAllProductsController = async (req, res) => {
  console.log("Inside get All Products Controller");
  try {
    const allProducts = await products.find();
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// update product
exports.updateProductController = async (req, res) => {
  const { id } = req.params;
  const { productName, brandName, category, description, price, uploadedImg } = req.body;
  const uploadImage = req.file ? req.file.filename : uploadedImg;

  try {
    const updateProduct = await products.findByIdAndUpdate(
      { _id: id },
      {
        productName,
        brandName,
        category,
        description,
        price,
        uploadedImg: uploadImage,
      },
      { new: true }
    );
    await updateProduct.save();
    res.status(200).json(updateProduct);
  } catch (err) {
    res.status(401).json(err);
  }
};

// delete product
exports.deleteProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const removeProduct = await products.findByIdAndDelete({ _id: id });
    res.status(200).json(removeProduct);
  } catch (err) {
    res.status(401).json(err);
  }
};

// get a product
exports.viewProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await products.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

// increment product clicks
exports.incrementProductClicksController = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await products.findByIdAndUpdate(
      { _id: id },
      { $inc: { totalClicks: 1 } },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(401).json(err);
  }
};
