const {
  deleteUser,
  getAllUsers,
} = require("../../controller/admin/adminUser/userController");
const isAuthenicated = require("../../middleware/isAuthenticated");
const restrictTo = require("../../middleware/restrictTo");

const router = require("express").Router();

router.route("/users").get(isAuthenicated, restrictTo("admin"), getAllUsers);

router
  .route("/users/:id")
  .delete(isAuthenicated, restrictTo("admin"), deleteUser);

module.exports = router;
