const express = require("express");
const {
  registerUser,
  loginUser,
  forgetPassword,
  verifyOtp,
  resetPassword,
} = require("../../controller/auth/authController");
const catchAsync = require("../../services/catchAsync");

const router = express.Router();

router.route("/register").post(catchAsync(registerUser));
router.route("/login").post(catchAsync(loginUser));
router.route("/forgetpassword").post(catchAsync(forgetPassword));
router.route("/verifyotp").post(catchAsync(verifyOtp));
router.route("/resetpassword").post(catchAsync(resetPassword));

module.exports = router;
