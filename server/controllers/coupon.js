const Coupon = require("../models/coupon");

//CREATE COUPON
const createNewCoupon = async (req, res) => {
  try {
    const { name, discount, expiry } = req.body;
    if (!name || !discount || !expiry) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    const response = await Coupon.create({
      ...req.body,
      expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: response ? true : false,
      createdCoupon: response ? response : "Create new coupon failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//GET ALL COUPON
const getAllCoupons = async (req, res) => {
  try {
    const response = await Coupon.find().select("-createdAt -updatedAt");

    return res.status(200).json({
      success: response ? true : false,
      Coupons: response ? response : "Get all coupon failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//UPDATE COUPON
const updateCoupon = async (req, res) => {
  try {
    const { cid } = req.params;
    if (Object.keys(req.body).length === 0) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    if (req.body.expiry) {
      req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;
    }

    const response = await Coupon.findByIdAndUpdate(cid, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: response ? true : false,
      updatedCoupon: response ? response : "Updated failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//DELETE COUPON
const deleteCoupon = async (req, res) => {
  try {
    const { cid } = req.params;

    const response = await Coupon.findByIdAndDelete(cid);

    return res.status(200).json({
      success: response ? true : false,
      deletedCoupon: response ? response : "Deleted failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createNewCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
};
