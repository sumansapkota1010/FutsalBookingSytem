const Slot = require("../../models/slotModel");

const bookSlot = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const slot = await Slot.findById(id);

  if (!slot) {
    return res.status(404).json({ message: "Slot not found" });
  }

  if (slot.isBooked) {
    return res.status(400).json({ message: "Slot is already booked" });
  }

  slot.isBooked = true;
  slot.bookedBy = userId;
  await slot.save();

  res.status(200).json({ message: "Slot booked successfully", slot });
};

module.exports = bookSlot;
