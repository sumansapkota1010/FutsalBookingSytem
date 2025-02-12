const express = require("express");
const {
  registerUser,
  loginUser,
  forgetPassword,
} = require("../../controller/auth/authController");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgetpassword").post(forgetPassword);

module.exports = router;

