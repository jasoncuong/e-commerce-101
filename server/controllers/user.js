const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    if (!email || !password || !firstname || !lastname) {
      return res
        .status(400)
        .json({ success: false, message: "Missing inputs" });
    }

    const response = await User.create(req.body);

    return res.status(200).json({
      success: response ? true : false,
      message: "Register Successfully!",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email and/or Mobile already exist",
    });
  }
};

module.exports = {
  register,
};
