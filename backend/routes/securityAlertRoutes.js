const express = require("express");
const router = express.Router();
const securityAlertController = require("../controllers/securityAlertController");

router.post("/alert", securityAlertController.createAlert);
router.get("/alerts", securityAlertController.getAlerts);

module.exports = router;
