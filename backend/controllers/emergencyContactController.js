const EmergencyContact = require("../models/EmergencyContact");
const User = require("../models/User");

// ✅ Save a new emergency contact (with max 3 limit)
exports.createContact = async (req, res) => {
  try {
    const { name, phone, userId } = req.body;

    if (!name || !phone || !userId) {
      return res.status(400).json({ error: "Missing name, phone, or userId" });
    }

    const existing = await EmergencyContact.findAll({ where: { userId } });
    if (existing.length >= 3) {
      return res.status(400).json({ error: "You can only save up to 3 emergency contacts." });
    }

    const contact = await EmergencyContact.create({ name, phone, userId });
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Error saving contact" });
  }
};

// ✅ Get all emergency contacts for a specific user
exports.getContactsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId parameter" });
    }

    const contacts = await EmergencyContact.findAll({ where: { userId } });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Error fetching contacts" });
  }
};

// ✅ Send SMS to all emergency contacts (call this inside your alert logic)
const twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhone = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

exports.sendEmergencyAlertToContacts = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) return;

    const contacts = await EmergencyContact.findAll({ where: { userId } });

    for (const contact of contacts) {
      await client.messages.create({
        body: `🚨 Alert: ${user.name || "Someone"} may be in danger. Please reach out to them immediately.`,
        from: fromPhone,
        to: contact.phone,
      });
    }
  } catch (err) {
    console.error("❌ Twilio SMS Error:", err.message);
  }
};
