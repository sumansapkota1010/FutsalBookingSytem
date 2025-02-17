const express = require("express");
const isAuthenicated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");
const catchAsync = require("../../services/catchAsync");
const createSlot = require("../../controller/slot/createSlot");
const getSlotsByGroundAndDate = require("../../controller/slot/getSlotByGroundAndDate");
const getAllSlot = require("../../controller/slot/getAllSlot");


const router = express.Router();

router
  .route("/createslot")
  .post(isAuthenicated, restrictTo("admin"), catchAsync(createSlot));

router.route("/slot").get(isAuthenicated, catchAsync(getSlotsByGroundAndDate));
router
  .route("/slot/all")
  .get(isAuthenicated, restrictTo("admin"), catchAsync(getAllSlot));

module.exports = router;
