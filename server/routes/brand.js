const router = require("express").Router();
const ctrls = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

//CREATE NEW BRAND
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBrand);

//GET BRAND
router.get("/", ctrls.getBrand);

//UPDATE BRAND
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBrand);

//DELETE BRAND
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBrand);

module.exports = router;
