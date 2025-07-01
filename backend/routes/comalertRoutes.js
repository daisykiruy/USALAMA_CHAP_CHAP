const express = require("express");
const router = express.Router();
const comalertController = require("../controllers/comalertController");

// POST a new community alert
router.post("/", comalertController.createComAlert);

// GET all community alerts
router.get("/", comalertController.getAllComAlerts);

module.exports = router;
