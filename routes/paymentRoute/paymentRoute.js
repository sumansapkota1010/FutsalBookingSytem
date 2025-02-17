const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const {
  initiateKhaltiPayment,
  verifyPidx,
} = require("../../controller/payment/paymentController");
const restrictTo = require("../../middleware/restrictTo");

const router = express.Router();

router
  .route("/payment")
  .post(isAuthenicated, restrictTo("admin"), catchAsync(initiateKhaltiPayment));

router.route("/payment/success").get(catchAsync(verifyPidx));

module.exports = router;
