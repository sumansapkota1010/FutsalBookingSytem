const express = require("express");
const getGround = require("../../controller/ground/getGround");
const createGround = require("../../controller/ground/createGround");
const isAuthenicated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");
const { multer, storage } = require("../../middleware/multerConfig");
const upload = multer({ storage: storage });

const router = express.Router();

router.route("/getground").get(isAuthenicated, getGround);
router
  .route("/createground")
  .post(
    isAuthenicated,
    restrictTo("admin"),
    upload.single(groundImage),
    createGround
  );

module.exports = router;
