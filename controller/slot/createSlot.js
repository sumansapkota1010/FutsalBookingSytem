const { default: mongoose } = require("mongoose");
const Ground = require("../../models/groundModel");
const Slot = require("../../models/slotModel");

const createSlot = async (req, res) => {
  const { ground, startTime, endTime, date, price } = req.body;

  if (!ground || !startTime || !endTime || !date || !price) {
    return res.status(400).json({
      message: "Please provide ground, start time, end time, date, and price",
    });
  }
  const groundId = new mongoose.Types.ObjectId(ground);

  // Find the specific ground by ID
  const groundExists = await Ground.findById(groundId);

  if (!groundExists) {
    return res.status(404).json({
      message: "Ground not found",
    });
  }

  //same ground,date,starttime and end time already exists garxa ki gardaina check garne

  const slotExists = await Slot.findOne({
    ground: groundId,
    date,
    startTime,
    endTime,
  });
  if (slotExists) {
    return res.status(400).json({
      message: "A slot with the same ground ,date and time already exists",
    });
  }

  // Create the slot
  const slot = await Slot.create({
    ground: groundId,
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
