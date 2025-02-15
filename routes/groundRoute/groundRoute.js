const express = require("express");
const getGround = require("../../controller/ground/getGround");
const createGround = require("../../controller/ground/createGround");
const isAuthenicated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");
const { multer, storage } = require("../../middleware/multerConfig");
const singleGround = require("../../controller/ground/singleGround");
const updateGround = require("../../controller/ground/updateGround");
const deleteGround = require("../../controller/ground/deleteGround");
const catchAsync = require("../../services/catchAsync");
const upload = multer({ storage: storage });

const router = express.Router();

router.route("/getground").get(isAuthenicated, catchAsync(getGround));
console.log("createGround:", createGround);
router
  .route("/createground")
  .post(
    isAuthenicated,
    restrictTo("admin"),
    upload.single("groundImage"),
    catchAsync(createGround)
  );
router.route("/singleground/:id").get(isAuthenicated, singleGround);
router
  .route("/updateground/:id")
  .put(
    isAuthenicated,
    restrictTo("admin"),
    upload.single("groundImage"),
    catchAsync(updateGround)
  );
router
  .route("/deleteground/:id")
  .delete(isAuthenicated, restrictTo("admin"), catchAsync(deleteGround));

module.exports = router;
