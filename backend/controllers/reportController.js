const Report = require("../models/Report");

// Create a new report
exports.createReport = async (req, res) => {
  try {
    const { userId, authorityId, description } = req.body;
    const report = await Report.create({ userId, authorityId, description });
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ error: "Error creating report" });
  }
};

// Get all reports
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: "Error fetching reports" });
  }
};

// Get a specific report
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByPk(id);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Error fetching report" });
  }
};

// Update report status
exports.updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const report = await Report.findByPk(id);
    if (!report) return res.status(404).json({ error: "Report not found" });

    report.status = status;
    await report.save();

    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Error updating report status" });
  }
};
