const jwt = require("jsonwebtoken");

const verifyAccessToken = async (req, res, next) => {
  try {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          return res
            .status(401)
            .json({ success: false, message: "Invalid access token" });
        }
        req.user = decode;
        next();
      });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Require authentication!" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "REQUIRE ADMIN ROLE!" });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { verifyAccessToken, isAdmin };
