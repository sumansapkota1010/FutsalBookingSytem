const Contact = require("../../models/contactModel");
const sendEmail = require("../../services/sendEmail");

const contactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message || !subject) {
    return res.status(400).json({
      message: "Please provide name , email and message",
    });
  }
  const contact = await Contact.create({
    name,
    email,
    message,
    subject,
  });
  await sendEmail({
    email: email,
    subject: `New Contact Form Submission ${subject}`,
    message: `You have received a new message from ${name} (${email}):\n\n${message}`,
  });

  res.status(200).json({
    message: "Email sent successfully",
    data: contact,
  });
};

module.exports = contactForm;
