const express = require("express");
const router = express.Router();
const emergencyContactController = require("../controllers/emergencyContactController");

router.post("/contact", emergencyContactController.addContact);
router.get("/contacts", emergencyContactController.getContacts);

module.exports = router;
