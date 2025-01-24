const router = require("express").Router();
const ctrls = require("../controllers/coupon");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

//CREATE NEW COUPON
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewCoupon);

//GET ALL COUPON
router.get("/", ctrls.getAllCoupons);

//UPDATE COUPON
router.put("/:cid", [verifyAccessToken, isAdmin], ctrls.updateCoupon);

//DELETE COUPON
router.delete("/:cid", [verifyAccessToken, isAdmin], ctrls.deleteCoupon);

module.exports = router;
