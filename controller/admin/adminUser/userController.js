const User = require("../../../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      data: users,
      message: "All users fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// delete User API
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      message: "Please provide userId",
    });
  }
  // check if that userId users exists or not
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({
      message: "User not found with that userid",
    });
  } else {
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User deleted successfully",
    });
  }
};
