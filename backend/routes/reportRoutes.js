const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.post("/", reportController.createReport);
router.get("/", reportController.getAllReports);
router.get("/:id", reportController.getReportById);
router.put("/:id/status", reportController.updateReportStatus);

module.exports = router;
