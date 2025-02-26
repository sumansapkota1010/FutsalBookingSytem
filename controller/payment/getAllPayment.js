const Payment = require("../../models/paymentModel");

const getAllPayment = async (req, res) => {
  const paymentExists = await Payment.find({})
    .populate("user", "userName userEmail ")
    .populate("booking");

  if (paymentExists.length === 0)
    return res.status(400).json({
      message: "Payment doesnot exists",
    });
  res.status(200).json({
    message: "Payment fetched successfully",
    data: paymentExists,
  });
};

module.exports = getAllPayment;
