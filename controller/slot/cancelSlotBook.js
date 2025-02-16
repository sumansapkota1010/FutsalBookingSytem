const Slot = require("../../models/slotModel");

const cancelSlotBooking = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const slot = await Slot.findById(id);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (!slot.isBooked || slot.bookedBy.toString() !== userId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot cancel this booking" });
    }

    // Cancel the booking
    slot.isBooked = false;
    slot.bookedBy = null;
    await slot.save();

    res.status(200).json({ message: "Booking canceled successfully", slot });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error canceling booking", error: error.message });
  }
};
module.exports = cancelSlotBooking;
