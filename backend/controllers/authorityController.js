const SecurityAlert = require("../models/SecurityAlert");

exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await SecurityAlert.findAll();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching security alerts" });
  }
};

exports.getReports = async (req, res) => {
  try {
    // Reports are just analyzed security alerts.
    const reports = await SecurityAlert.findAll({
      where: { status: "resolved" } // Example: Filter resolved cases.
    });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reports" });
  }
};
