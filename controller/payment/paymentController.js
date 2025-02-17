const axios = require("axios");
const Booking = require("../../models/bookingModel");
const Payment = require("../../models/paymentModel");
const Slot = require("../../models/slotModel");

exports.initiateKhaltiPayment = async (req, res) => {
  const { bookingId, amount } = req.body;
  const userId = req.user._id;

  if (!bookingId || !amount) {
    return res.status(400).json({
      message: "Please provide bookingId and amount",
    });
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({
      message: "Booking not found",
    });
  }

  const payment = await Payment.create({
    user: userId,
    booking: bookingId,
    amount,
  });

  const data = {
    return_url: "http://localhost:3000/api/payment/success",
    purchase_order_id: bookingId || 43,
    amount: amount || 10,
    website_url: "http://localhost:3000/",
    purchase_order_name: "FutsalBooking_" + bookingId,
  };

  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/initiate/",
    data,
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      },
    }
  );

  payment.pidx = response.data.pidx;
  await payment.save();
  res.redirect(response.data.payment_url);
  console.log(response.data);
};

exports.verifyPidx = async (req, res) => {
  const { pidx, amount } = req.query;

  //  Find payment record using pidx
  const payment = await Payment.findOne({ pidx });

  if (!payment) {
    return res
      .status(404)
      .json({ success: false, message: "Payment not found." });
  }

  const response = await axios.post(
    "https://a.khalti.com/api/v2/epayment/lookup/",
    { pidx },
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
      },
    }
  );
  console.log(response.data.status);

  const paymentData = response.data;

  if (paymentData.status === "Completed") {
    // Update payment status in the database
    payment.status = "completed";
    payment.amount = amount;
    await payment.save();

    // Update the associated booking's status to "confirmed"
    const booking = await Booking.findById(payment.booking);
    if (booking) {
      booking.status = "confirmed";
      booking.payment = payment._id;
      await booking.save();
    }

    const slot = await Slot.findById(booking.slot);
    if (slot) {
      slot.isBooked = true;
      slot.bookedBy = booking.user;
      await slot.save();
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified and booking confirmed.",
      payment,
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed. Status is not completed.",
      paymentData,
    });
  }
};
