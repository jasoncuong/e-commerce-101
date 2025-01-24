const router = require("express").Router();
const ctrls = require("../controllers/productCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

//CREATE CATEGORY
router.post("/", [verifyAccessToken, isAdmin], ctrls.createCategory);

//GET CATEGORIES
router.get("/", ctrls.getCategories);

//UPDATE CATEGORY
router.put("/:pcid", [verifyAccessToken, isAdmin], ctrls.updateCategory);

//DELETE CATEGORY
router.delete("/:pcid", [verifyAccessToken, isAdmin], ctrls.deleteCategory);

module.exports = router;
