const Ground = require("../../models/groundModel");
const Slot = require("../../models/slotModel");

const createSlot = async (req, res) => {
  const { ground, startTime, endTime, date, price } = req.body;

  if (!ground || !startTime || !endTime || !date || !price) {
    return res.status(400).json({
      message: "Please provide ground, start time, end time, date, and price",
    });
  }

  // Find the specific ground by ID
  const groundExists = await Ground.findById(ground);

  if (!groundExists) {
    return res.status(404).json({
      message: "Ground not found",
    });
  }

  // Create the slot
  const slot = await Slot.create({
    ground,
    startTime,
    endTime,
    date,
    price,
  });

  // Push the Slot ID into the Ground's slots array
  groundExists.slots.push(slot._id);
  await groundExists.save();

  res.status(201).json({
    message: "Slot created successfully",
    slot: slot,
    ground: groundExists,
  });
};

module.exports = createSlot;
