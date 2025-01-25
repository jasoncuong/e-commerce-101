const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");

//CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const { coupon } = req.body;
    const userCart = await User.findById(_id)
      .select("cart")
      .populate("cart.product", "title price");

    const products = userCart?.cart?.map((item) => ({
      product: item.product._id,
      count: item.quantity,
      color: item.color,
    }));
    let total = userCart?.cart?.reduce(
      (sum, item) => item.product.price * item.quantity + sum,
      0
    );
    const createData = { products, total, orderBy: _id };
    if (coupon) {
      const selectedCoupon = await Coupon.findById(coupon);

      total =
        Math.round((total * (1 - +selectedCoupon?.discount / 100)) / 1000) *
          1000 || total;
      createData.total = total;
      createData.coupon = coupon;
    }

    const result = await Order.create(createData);
    return res.status(200).json({
      success: result ? true : false,
      result: result ? result : "Created failed!",
      userCart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//UPDATE STATUS
const updateStatus = async (req, res) => {
  try {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) {
      return res
        .status(401)
        .json({ success: false, message: "Missing status" });
    }
    const response = await Order.findByIdAndUpdate(
      oid,
      { status: status },
      { new: true }
    );
    return res.status(200).json({
      success: response ? true : false,
      updatedStatus: response ? response : "Updated failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//GET ORDER STATUS BY CLIENT
const getUserOrder = async (req, res) => {
  try {
    const { _id } = req.user;

    const response = await Order.find({ orderBy: _id });
    return res.status(200).json({
      success: response ? true : false,
      updatedStatus: response ? response : "Updated failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//GET ORDER STATUS BY ADMIN
const getUserOrderByAdmin = async (req, res) => {
  try {
    const response = await Order.find();
    return res.status(200).json({
      success: response ? true : false,
      updatedStatus: response ? response : "Updated failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  updateStatus,
  getUserOrder,
  getUserOrderByAdmin,
};
