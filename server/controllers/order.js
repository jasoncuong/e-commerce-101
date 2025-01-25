const Order = require("../models/order");
const User = require("../models/user");

//CREATE Order
const createOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const userCart = await User.findById(_id).select("cart");
    console.log(userCart);

    return res.status(200).json({
      success: userCart ? true : false,
      createdOrder: userCart ? userCart : "Create new order failed!",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
};
