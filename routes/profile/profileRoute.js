const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const {
  getMyProfile,
  updateProfile,
  deleteProfile,
} = require("../../controller/user/profile/profileController");

const router = express.Router();

router
  .route("/profile")
  .get(isAuthenicated, catchAsync(getMyProfile))
  .put(isAuthenicated, catchAsync(updateProfile))
  .delete(isAuthenicated, catchAsync(deleteProfile));

module.exports = router;
