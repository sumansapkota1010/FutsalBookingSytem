const Ground = require("../../models/groundModel");
const Slot = require("../../models/slotModel");
const Review = require("../../models/reviewModel");

const getGround = async (req, res) => {
  const grounds = await Ground.find().populate("slots").populate("reviews");
  if (!grounds) {
    return res.status(400).json({
      message: "Ground not found",
    });
  }
  res.status(200).json({
    data: grounds,
  });
};

module.exports = getGround;
