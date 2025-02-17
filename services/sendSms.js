const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken);

const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      to: `+977${to}`,
      from: "+18284578842",
    });

    console.log("Message sent successfully! SID:", response.sid);
    return response.sid;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

module.exports = sendSMS;
