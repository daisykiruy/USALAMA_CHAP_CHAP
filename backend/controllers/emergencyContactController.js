const EmergencyContact = require("../models/EmergencyContact");

// ✅ Save a new emergency contact
exports.createContact = async (req, res) => {
  try {
    const { name, phone, userId } = req.body;

    if (!name || !phone || !userId) {
      return res.status(400).json({ error: "Missing name, phone, or userId" });
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
