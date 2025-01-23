const Product = require("../models/product");
const slugify = require("slugify");

//CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(401).json({
        success: false,
        message: "Missing inputs",
      });
    }

    if (req.body && req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const newProduct = await Product.create(req.body);
    return res.status(200).json({
      success: newProduct ? true : false,
      createdProduct: newProduct ? newProduct : "Cannot create new product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//GET PRODUCT
const getProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await Product.findById(pid);
    return res.status(200).json({
      success: product ? true : false,
      productData: product ? product : "Cannot get product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//GET ALL PRODUCT
//FILTERING, SORTING & PAGINATION
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: products ? true : false,
      productData: products ? products : "Cannot get products",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    if (req.body && req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: updatedProduct ? true : false,
      productData: updatedProduct ? updatedProduct : "Cannot update product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

//DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
      success: deletedProduct ? true : false,
      productData: deletedProduct ? deletedProduct : "Cannot delete product",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
