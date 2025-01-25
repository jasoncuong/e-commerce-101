const router = require("express").Router();
const ctrls = require("../controllers/order");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

//CREATE NEW ORDER
router.post("/", verifyAccessToken, ctrls.createOrder);

//GET ORDER BY CLIENT
router.get("/", verifyAccessToken, ctrls.getUserOrder);

//GET ORDER BY ADMIN
router.get("/admin", verifyAccessToken, isAdmin, ctrls.getUserOrderByAdmin);

//UPDATE STATUS
router.put("/status/:oid", verifyAccessToken, isAdmin, ctrls.updateStatus);

module.exports = router;
