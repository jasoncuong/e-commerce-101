const router = require("express").Router();
const ctrls = require("../controllers/blog");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

//CREATE NEW BLOG
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);

//GET ALL BLOG
router.get("/", ctrls.getAllBlogs);

//UPDATE IMAGES
router.put(
  "/uploadimage/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrls.upLoadImagesBlog
);

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
