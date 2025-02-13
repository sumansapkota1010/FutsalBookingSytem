const Ground = require("../../models/groundModel");
const Slot = require("../../models/slotModel");
const Review = require("../../models/reviewModel");

const getGround = async (req, res) => {
  try {
    const grounds = await Ground.find().populate("slots").populate("reviews");
    res.status(200).json({ success: true, data: grounds });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = getGround;
