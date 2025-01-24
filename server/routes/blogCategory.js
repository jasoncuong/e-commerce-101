const router = require("express").Router();
const ctrls = require("../controllers/blogCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

//CREATE BLOG CATEGORY
router.post("/", [verifyAccessToken, isAdmin], ctrls.createBlogCategory);

//GET BLOG CATEGORIES
router.get("/", ctrls.getBlogCategories);

//UPDATE BLOG CATEGORY
router.put("/:bcid", [verifyAccessToken, isAdmin], ctrls.updateBlogCategory);

//DELETE BLOG CATEGORY
router.delete("/:bcid", [verifyAccessToken, isAdmin], ctrls.deleteBlogCategory);

module.exports = router;
