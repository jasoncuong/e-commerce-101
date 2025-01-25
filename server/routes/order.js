const router = require("express").Router();
const ctrls = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

//CREATE NEW ORDER
router.post("/", [verifyAccessToken], ctrls.createOrder);

module.exports = router;
