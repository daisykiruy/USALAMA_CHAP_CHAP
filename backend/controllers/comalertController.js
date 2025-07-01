const Comalert = require("../models/comalert");

// Create a new community alert
exports.createComAlert = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const alert = await Comalert.create({ message });
    res.status(201).json(alert);
  } catch (error) {
    console.error("Create ComAlert Error:", error);
    res.status(500).json({ error: "Failed to create community alert" });
  }
};

// Get all community alerts
exports.getAllComAlerts = async (req, res) => {
  try {
    const alerts = await Comalert.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(alerts);
  } catch (error) {
    console.error("Fetch ComAlerts Error:", error);
    res.status(500).json({ error: "Failed to fetch community alerts" });
  }
};
