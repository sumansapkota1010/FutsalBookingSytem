const {
  deleteUser,
  getAllUsers,
} = require("../../controller/admin/adminUser/userController");
const isAuthenicated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");
const catchAsync = require("../../services/catchAsync");

const router = require("express").Router();

router
  .route("/users")
  .get(isAuthenicated, restrictTo("admin"), catchAsync(getAllUsers));

router
  .route("/users/:id")
  .delete(isAuthenicated, restrictTo("admin"), catchAsync(deleteUser));

module.exports = router;
