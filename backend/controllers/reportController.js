const Report = require("../models/Report");
const User = require("../models/User");

// Create a new report
exports.createReport = async (req, res) => {
  try {
    const { userId, content } = req.body;
    if (!userId || !content) {
      return res.status(400).json({ error: "Missing userId or content" });
    }

    const report = await Report.create({ userId, content });
    res.status(201).json(report);
  } catch (error) {
    console.error("Create Report Error:", error);
    res.status(500).json({ error: "Error creating report" });
  }
};

// Get all reports (for admin)
exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"], // Adjust based on your User model fields
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(reports);
  } catch (error) {
    console.error("Fetch All Reports Error:", error);
    res.status(500).json({ error: "Error fetching reports" });
  }
};

// Get a specific report by ID
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await Report.findByPk(id, {
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json(report);
  } catch (error) {
    console.error("Fetch Single Report Error:", error);
    res.status(500).json({ error: "Error fetching report" });
  }
};

// Optional: Update report status (only if you add `status` field to model)
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
    console.error("Update Report Status Error:", error);
    res.status(500).json({ error: "Error updating report status" });
  }
};
