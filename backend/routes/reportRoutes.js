const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Create a new report
router.post("/", reportController.createReport);

// Get all reports (for admin)
router.get("/", reportController.getAllReports);

// Get a specific report by ID
router.get("/:id", reportController.getReportById);

// (Optional) Update status of a report (future use)
router.put("/:id/status", reportController.updateReportStatus);

module.exports = router;
