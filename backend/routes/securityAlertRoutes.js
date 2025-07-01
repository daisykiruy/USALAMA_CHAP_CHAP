const express = require("express");
const router = express.Router();
const securityAlertController = require("../controllers/securityAlertController");

// 🚨 Send an alert (includes socket + Twilio SMS)
router.post("/send", securityAlertController.sendAlert);

// 📝 Create an alert (generic/manual fallback if needed)
router.post("/alert", securityAlertController.createAlert);

// 📥 Get all alerts
router.get("/alerts", securityAlertController.getAlerts);

// 🕓 Get alerts from the last 24 hours
router.get("/recent", securityAlertController.getRecentAlerts);

// 📊 Get statistics for dashboard analytics
router.get("/stats", securityAlertController.getAlertStats);

module.exports = router;
