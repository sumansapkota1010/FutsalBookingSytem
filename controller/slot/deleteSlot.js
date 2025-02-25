const Slot = require("../../models/slotModel");

const deleteSlot = async (req, res) => {
  const { slotId } = req.params;
  if (!slotId) {
    return res.status(400).json({
      message: "Please provide slot id",
    });
  }
  const slotExists = await Slot.findByIdAndDelete(slotId);

  if (!slotExists) {
    return res.status(400).json({
      message: "Slot not found",
    });
  }
  res.status(200).json({
    message: "Slot deleted successfully",
  });
};

module.exports = deleteSlot;
