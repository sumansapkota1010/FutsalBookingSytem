const mongoose = require("mongoose");
const Ground = require("../../models/groundModel");
const Review = require("../../models/reviewModel");

const getGroundReview = async (req, res) => {
  const { id: groundId } = req.params;

  if (!groundId) {
    return res.status(400).json({ message: "Please provide ground ID" });
  }

  // Check if the ground exists
  const groundExists = await Ground.findById(groundId);
  if (!groundExists) {
    return res
      .status(404)
      .json({ message: "Ground with that ID does not exist" });
  }

  // Fetch reviews related to the ground
  const reviews = await Review.find({ ground: groundId }).populate(
    "user",
    "id userName"
  );

  res.status(200).json({
    message: "Review fetched successfully",
    data: reviews,
  });
};

module.exports = getGroundReview;
