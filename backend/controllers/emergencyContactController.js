const EmergencyContact = require("../models/EmergencyContact");

exports.addContact = async (req, res) => {
  try {
    const contact = await EmergencyContact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Error adding contact" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await EmergencyContact.findAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching contacts" });
  }
};
