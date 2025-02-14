const express = require("express");
const getGround = require("../../controller/ground/getGround");
const createGround = require("../../controller/ground/createGround");
const isAuthenicated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");

const router = express.Router();

router.route("/getground").get(isAuthenicated, getGround);
router
  .route("/createground")
  .post(isAuthenicated, restrictTo("admin"), createGround);

module.exports = router;
