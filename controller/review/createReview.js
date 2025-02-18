const Ground = require("../../models/groundModel");
const Review = require("../../models/reviewModel");

const createReview = async (req, res) => {
  const userId = req.user.id;
  const { rating, comment } = req.body;
  const { id: groundId } = req.params;
  console.log(groundId);

  if (!rating || !comment) {
    return res.status(400).json({
      message: "Please provide rating, comment",
    });
  }

  const ground = await Ground.findById(groundId);
  if (!ground) {
    return res.status(400).json({
      message: "Ground not found",
    });
  }
  //insert them into review
  await Review.create({
    user: userId,
    ground: groundId,
    rating,
    comment,
  });
  res.status(200).json({
    message: "Review created successfully",
  });
};

module.exports = createReview;
