const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const contactForm = require("../../controller/contact/contactForm");
const restrictTo = require("../../middleware/restrictTo");
const getContactForm = require("../../controller/contact/getContactForm");

const router = express.Router();

router
  .route("/contact")
  .post(isAuthenicated, catchAsync(contactForm))
  .get(isAuthenicated, restrictTo("admin"), catchAsync(getContactForm));

module.exports = router;
