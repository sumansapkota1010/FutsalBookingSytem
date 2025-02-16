const Slot = require("../../models/slotModel");

const getAllSlot = async (req, res) => {
  const slots = await Slot.find({})
    .populate("ground", "name location")
    .populate("bookedBy", "name email");
  if (slots.length == 0) {
    return res.status(400).json({
      message: "Slot not found",
    });
  }
  res.status(200).json({
    message: "All slot fetched successfully",
    data: slots,
  });
};

module.exports = getAllSlot;
