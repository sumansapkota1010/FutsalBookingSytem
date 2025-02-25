const mongoose = require("mongoose");

const groundSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    pricePerHour: { type: Number, required: true },
    image: { type: String },
    operatingHours: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    slots: [{ type: mongoose.Schema.Types.ObjectId, ref: "Slot" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    timestamps: true,
  }
);

const Ground = mongoose.model("Ground", groundSchema);

module.exports = Ground;
