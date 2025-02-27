const Contact = require("../../models/contactModel");

const getContactForm = async (req, res) => {
  const contacts = await Contact.find();
  if (contacts.length === 0) {
    return res.status(400).json({
      message: "No contacts found",
    });
  }
  res.status(200).json({
    message: "Contact fetched successfully",
    data: contacts,
  });
};

module.exports = getContactForm;
