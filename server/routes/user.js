const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

//REGISTER
router.post("/register", ctrls.register);

//LOGIN
router.post("/login", ctrls.login);

//GET CURRENT USER
router.get("/current", verifyAccessToken, ctrls.getCurrent);

//GET ALL USERS
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers);

//CREATE NEW ACCESS TOKEN
router.post("/refreshtoken", ctrls.refreshAccessToken);

//LOG OUT
router.get("/logout", ctrls.logout);

//FORGOT PASSWORD
router.get("/forgotpassword", ctrls.forgotPassword);

//RESET PASSWORD
router.put("/resetpassword", ctrls.resetPassword);

//DELETE USER
router.delete("/", [verifyAccessToken, isAdmin], ctrls.deleteUser);

//UPDATE USER
router.put("/current", verifyAccessToken, ctrls.updateUser);

//UPDATE USER ADDRESS
router.put("/address", [verifyAccessToken], ctrls.updateUserAddress);

//ADD TO CART
router.put("/cart", [verifyAccessToken], ctrls.updateCart);

//UPDATE USER BY ADMIN
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUser);

module.exports = router;
