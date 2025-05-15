const SecurityAlert = require("../models/SecurityAlert");

exports.createAlert = async (req, res) => {
  try {
    const alert = await SecurityAlert.create(req.body);
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: "Error creating security alert" });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await SecurityAlert.findAll();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching alerts" });
  }
};
