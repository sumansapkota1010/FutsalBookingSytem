const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const {
  getMyProfile,
  updateProfile,
  deleteProfile,
  updateMyPassword,
} = require("../../controller/user/profile/profileController");

const router = express.Router();

router
  .route("/profile")
  .get(isAuthenicated, catchAsync(getMyProfile))
  .patch(isAuthenicated, catchAsync(updateProfile))
  .delete(isAuthenicated, catchAsync(deleteProfile));

router
  .route("/changepassword")
  .patch(isAuthenicated, catchAsync(updateMyPassword));

module.exports = router;
