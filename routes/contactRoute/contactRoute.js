const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const catchAsync = require("../../services/catchAsync");
const contactForm = require("../../controller/contact/contactForm");

const router = express.Router();

router.route("/contact").post(isAuthenicated, catchAsync(contactForm));

module.exports = router;
