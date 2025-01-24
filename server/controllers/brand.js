const Brand = require("../models/brand");

//CREATE BRAND
const createNewBrand = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    const response = await Brand.create(req.body);

    return res.status(200).json({
      success: response ? true : false,
      createdBrand: response ? response : "Create new brand failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//GET ALL BRAND
const getBrand = async (req, res) => {
  try {
    const response = await Brand.find();

    return res.status(200).json({
      success: response ? true : false,
      brands: response ? response : "Get brand failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//UPDATE BRAND
const updateBrand = async (req, res) => {
  try {
    const { bid } = req.params;
    const response = await Brand.findByIdAndUpdate(bid, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: response ? true : false,
      updatedBrand: response ? response : "Updated failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//DELETE BRAND
const deleteBrand = async (req, res) => {
  try {
    const { bid } = req.params;
    const response = await Brand.findByIdAndDelete(bid);

    return res.status(200).json({
      success: response ? true : false,
      deletedBrand: response ? response : "Deleted failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createNewBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};
