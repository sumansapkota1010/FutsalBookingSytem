const { default: mongoose } = require("mongoose");
const Ground = require("../../models/groundModel");
const Review = require("../../models/reviewModel");

const deleteGroundReview = async (req, res) => {
  const { reviewId } = req.params;
  console.log(reviewId);
  if (!reviewId) {
    return res.status(400).json({
      message: "Please provide review id",
    });
  }
  const userId = req.user.id;

  console.log(userId);
  const review = await Review.findByIdAndDelete(reviewId);
  const ownerIdOfReview = review.user;
  const ownerIdOfReviewString = ownerIdOfReview.toString();
  console.log(ownerIdOfReviewString);

  if (userId !== ownerIdOfReviewString) {
    return res.status(400).json({
      message: "You don't have permission to delete this review",
    });
  }

  res.status(200).json({
    message: "Review deleted successfully",
    data: review,
  });
};

module.exports = deleteGroundReview;
