const express = require("express");
const {
  registerUser,
  loginUser,
  forgetPassword,
  verifyOtp,
  resetPassword,
} = require("../../controller/auth/authController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetpassword").post(forgetPassword);
router.route("/verifyotp").post(verifyOtp);
router.route("/resetpassword").post(resetPassword);

module.exports = router;
