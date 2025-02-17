const Booking = require("../../models/bookingModel");
const Slot = require("../../models/slotModel");

const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  const userId = req.user._id;

  if (!bookingId) {
    res.status(400).json({
      message: "Please provide booking id",
    });
  }
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    res.status(400).json({
      message: "Booking not found",
    });
  }
  if (booking.user.toString() !== userId.toString()) {
    return res.status(403).json({
      message: "You are not authorized to cancel this  booking",
    });
  }
  if (booking.status == "cancelled") {
    return res.status(400).json({
      message: "Booking is already cancelled",
    });
  }
  booking.status = "cancelled";
  await booking.save();

  const slot = await Slot.findById(booking.slot);
  if (slot) {
    slot.isBooked = false;
    slot.bookedBy = null;
    await slot.save();
  }
  res.status(200).json({
    message: "Booking cancelled successfull",
    data: booking,
  });
};

module.exports = cancelBooking;
