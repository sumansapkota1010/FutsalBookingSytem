const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const {
  initiateKhaltiPayment,
} = require("../../controller/payment/paymentController");

const router = express.Router();

router
  .route("/khalti/initiate")
  .post(isAuthenicated, catchAsync(initiateKhaltiPayment));

module.exports = router;
