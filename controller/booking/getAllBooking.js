const Booking = require("../../models/bookingModel");
const Payment = require("../../models/paymentModel");

const getAllBookings = async (req, res) => {
  const bookings = await Booking.find()
    .populate("ground", "name location")
    .populate("slot", "startTime endTime date price")
    .populate("payment", "amount status method");
  console.log(bookings);
  res.status(200).json(bookings);
};

module.exports = getAllBookings;
