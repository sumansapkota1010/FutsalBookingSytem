const Slot = require("../../models/slotModel");

const getSlotByGroundAndDate = async (req, res) => {
  const { groundId, date } = req.query;

  try {
    const startOfDay = new Date(date);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const slots = await Slot.find({
      ground: groundId,
      date: { $gte: startOfDay, $lt: endOfDay },
    }).populate("bookedBy", "userName userEmail");

    res.status(200).json({
      message: "Slot fetched by ground and date",
      data: slots,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getSlotByGroundAndDate;
