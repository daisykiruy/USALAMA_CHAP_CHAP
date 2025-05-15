const express = require("express");
const router = express.Router();
const authorityController = require("../controllers/authorityController");

router.get("/alerts", authorityController.getAllAlerts);
router.get("/reports", authorityController.getReports);

module.exports = router;
