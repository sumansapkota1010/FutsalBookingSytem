const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const createReview = require("../../controller/review/createReview");
const getGroundReview = require("../../controller/review/getGroundReview");
const deleteReview = require("../../controller/review/deleteReview");

const router = express.Router();

router
  .route("/reviews/:id")
  .post(isAuthenicated, catchAsync(createReview))
  .get(catchAsync(getGroundReview));

router
  .route("/reviews/:reviewId")
  .delete(isAuthenicated, catchAsync(deleteReview));

module.exports = router;
