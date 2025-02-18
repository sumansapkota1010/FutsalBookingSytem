// get my profile

const User = require("../../../models/userModel");

exports.getMyProfile = async (req, res) => {
  const userId = req.user.id;

  const myProfile = await User.findById(userId);

  res.status(200).json({
    message: "Profile fetched successfully",
    data: myProfile,
  });
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { userName, userEmail, userPhoneNumber } = req.body;
  if (!userName || !userEmail || !userPhoneNumber) {
    return res.status(400).json({
      message: "Please provide username , user email and user phonenumber",
    });
  }
  const updatedProfile = await User.findByIdAndUpdate(
    userId,
    {
      userName,
      userEmail,
      userPhoneNumber,
    },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(200).json({
    message: "profile updated successfully",
    data: updatedProfile,
  });
};

exports.deleteProfile = async (req, res) => {
  const userId = req.user.id;

  await User.findByIdAndDelete(userId);
  res.status(400).json({
    message: "Profile deleted successfully",
    data: null,
  });
};
