const SecurityAlert = require("../models/SecurityAlert");
const EmergencyContact = require("../models/EmergencyContact"); // <-- Make sure this is imported

// 🔔 sendAlert with admin + emergency contact Socket.IO support
exports.sendAlert = async (req, res) => {
  try {
    const { userId, location, timestamp, media } = req.body;

    if (!userId || !location || !timestamp) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const alert = await SecurityAlert.create({
      userId,
      location,
      timestamp,
      media: media || null,
    });

    const io = req.app.get("io");

    // 1️⃣ Emit to all admins
    io.emit("new-alert", alert);

    // 2️⃣ Fetch emergency contacts for this user
    const contacts = await EmergencyContact.findAll({ where: { userId } });

    // 3️⃣ Emit to each contact's room
    contacts.forEach((contact) => {
      const room = `contact-${contact.phone}`;
      io.to(room).emit("contact-alert", {
        alert,
        contact,
      });
    });

    res.status(201).json({ message: "Alert sent successfully", alert });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send alert" });
  }
};

// 🛠️ Optional manual alert
exports.createAlert = async (req, res) => {
  try {
    const alert = await SecurityAlert.create(req.body);
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: "Error creating security alert" });
  }
};

// 📦 Fetch all alerts
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await SecurityAlert.findAll();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching alerts" });
  }
};
