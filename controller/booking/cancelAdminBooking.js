const Booking = require("../../models/bookingModel");
const Slot = require("../../models/slotModel");

const cancelBookingAdmin = async (req, res) => {
  const { bookingId } = req.params;

  if (!bookingId) {
    return res.status(400).json({ message: "Please provide booking ID" });
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  if (booking.status === "cancelled") {
    return res.status(400).json({ message: "Booking is already cancelled" });
  }

  booking.status = "cancelled";
  await booking.save();

  const slot = await Slot.findById(booking.slot);
  if (slot) {
    slot.isBooked = false;
    slot.bookedBy = null;
    await slot.save();
  }

  res
    .status(200)
    .json({ message: "Booking cancelled successfully", data: booking });
};

module.exports = cancelBookingAdmin;
