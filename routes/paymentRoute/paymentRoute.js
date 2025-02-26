const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const {
  initiateKhaltiPayment,
  verifyPidx,
} = require("../../controller/payment/paymentController");
const restrictTo = require("../../middleware/restrictTo");
const getAllBookings = require("../../controller/booking/getAllBooking");
const getAllPayment = require("../../controller/payment/getAllPayment");

const router = express.Router();

router
  .route("/payment/:bookingId")
  .post(isAuthenicated, catchAsync(initiateKhaltiPayment));

router.route("/payment/success").get(catchAsync(verifyPidx));

router
  .route("/payment/getAll")
  .get(isAuthenicated, restrictTo("admin"), catchAsync(getAllPayment));

module.exports = router;
