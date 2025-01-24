const ProductCategory = require("../models/productCategory");

//CREATE CATEGORY
const createCategory = async (req, res) => {
  try {
    const response = await ProductCategory.create(req.body);

    return res.status(200).json({
      success: response ? true : false,
      createdCategory: response
        ? response
        : "Create new product category failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//GET ALL CATEGORY
const getCategories = async (req, res) => {
  try {
    const response = await ProductCategory.find().select("title _id");

    return res.status(200).json({
      success: response ? true : false,
      productCategories: response ? response : "Get product categories failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    const { pcid } = req.params;
    const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: response ? true : false,
      updatedCategory: response ? response : "Updated failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const { pcid } = req.params;
    const response = await ProductCategory.findByIdAndDelete(pcid);

    return res.status(200).json({
      success: response ? true : false,
      deletedCategory: response ? response : "Deleted failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
