const Booking = require("../../models/bookingModel");
const Slot = require("../../models/slotModel");

const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  const booking = await Booking.findByIdAndDelete(bookingId);
  if (!booking) {
    return res.status(400).json({
      message: "Booking not found",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "You are not authorized to delete this booking",
    });
  }

  const slot = await Slot.findById(booking.slot);
  if (slot) {
    slot.isBooked = false;

    await slot.save();
  }

  res.status(200).json({
    message: "Booking deleted successfully and slot available again",
    data: booking,
  });
};

module.exports = deleteBooking;
