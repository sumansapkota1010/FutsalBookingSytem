const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  amount: { type: Number, required: true },
  method: { type: String, enum: ["Khalti", "eSewa"], required: true },
  status: {
    type: String,
    enum: ["success", "failed", "completed"],
    default: "pending",
  },
  paymentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
const mongoose = require("mongoose");
