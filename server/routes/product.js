const router = require("express").Router();
const ctrls = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");

//CREATE PRODUCT
router.post("/", [verifyAccessToken, isAdmin], ctrls.createProduct);

//GET All PRODUCT
router.get("/", ctrls.getProducts);

//RATINGS
router.put("/ratings", verifyAccessToken, ctrls.ratings);

//UPDATE IMAGES
router.put(
  "/uploadimage/:pid",
  [verifyAccessToken, isAdmin],
  uploader.array("images", 10),
  ctrls.upLoadImagesProduct
);

//UPDATE PRODUCT
router.put("/:pid", [verifyAccessToken, isAdmin], ctrls.updateProduct);

//GET PRODUCT
router.get("/:pid", ctrls.getProduct);

//DELETE PRODUCT
router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct);

module.exports = router;
