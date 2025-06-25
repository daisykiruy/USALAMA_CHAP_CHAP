const express = require("express");
const router = express.Router();
const emergencyContactController = require("../controllers/emergencyContactController");

// ✅ Save a new emergency contact
router.post("/", emergencyContactController.createContact);

// ✅ Get all contacts for a specific user
router.get("/:userId", emergencyContactController.getContactsByUser);

module.exports = router;
