const router = require("express").Router();
const ctrls = require("../controllers/user");
const { verifyAccessToken } = require("../middlewares/verifyToken");

//REGISTER
router.post("/register", ctrls.register);

//LOGIN
router.post("/login", ctrls.login);

//GET CURRENT USER
router.get("/current", verifyAccessToken, ctrls.getCurrent);

//CREATE NEW ACCESS TOKEN
router.post("/refreshtoken", ctrls.refreshAccessToken);

//LOG OUT
router.get("/logout", ctrls.logout);

//FORGOT PASSWORD
router.get("/forgotpassword", ctrls.forgotPassword);

//RESET PASSWORD
router.put("/resetpassword", ctrls.resetPassword);

module.exports = router;
