const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const createBooking = require("../../controller/booking/createBooking");
const getUserBookings = require("../../controller/booking/getUserBookings");
const restrictTo = require("../../middleware/restrictTo");

const router = express.Router();

router.route("/createbooking").post(isAuthenicated, catchAsync(createBooking));
router
  .route("/bookings/my-bookings")
  .get(isAuthenicated, catchAsync(getUserBookings));

module.exports = router;
