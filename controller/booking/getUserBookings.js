const Booking = require("../../models/bookingModel");
const Payment = require("../../models/paymentModel");

const getUserBookings = async (req, res) => {
  const userId = req.user._id;

  const bookings = await Booking.find({ user: userId })
    .populate("ground", "name location")
    .populate("slot", "startTime endTime date price")
    .populate("payment", "amount status method");
  console.log(bookings);
  res.status(200).json({
    message: "Booking fetched successfully",
    data: bookings,
  });
};

module.exports = getUserBookings;
