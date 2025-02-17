const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const createBooking = require("../../controller/booking/createBooking");
const router = express.Router();

router.route("/createbooking").post(isAuthenicated, catchAsync(createBooking));

module.exports = router;
