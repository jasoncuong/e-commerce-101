const router = require("express").Router();
const ctrls = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

//CREATE NEW BLOG
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);

//GET ALL BLOG
router.get("/", ctrls.getAllBlogs);

//GET BLOG
router.get("/one/:bid", ctrls.getBlog);

//LIKE BLOG
router.put("/like/:bid", [verifyAccessToken], ctrls.likeBlog);

//DELETE BLOG
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);

//DISLIKE BLOG
router.put("/dislike/:bid", [verifyAccessToken], ctrls.dislikeBlog);

//UPDATE BLOG
router.put("/update/:bid", [verifyAccessToken, isAdmin], ctrls.updateBlog);

module.exports = router;
