const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const createBooking = require("../../controller/booking/createBooking");
const getUserBookings = require("../../controller/booking/getUserBookings");
const restrictTo = require("../../middleware/restrictTo");
const cancelBooking = require("../../controller/booking/cancelBooking");
const getAllBookings = require("../../controller/booking/getAllBooking");

const router = express.Router();

router.route("/createbooking").post(isAuthenicated, catchAsync(createBooking));
router
  .route("/bookings/my-bookings")
  .get(isAuthenicated, catchAsync(getUserBookings));
router
  .route("/bookings/cancel/:bookingId")
  .post(isAuthenicated, catchAsync(cancelBooking));

router
  .route("/bookings/all")
  .get(isAuthenicated, restrictTo("admin"), catchAsync(getAllBookings));

module.exports = router;
