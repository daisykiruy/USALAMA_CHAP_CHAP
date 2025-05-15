require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// Import models (Ensures Sequelize recognizes them)
const User = require("./models/User");
const EmergencyContact = require("./models/EmergencyContact");
const SecurityAlert = require("./models/SecurityAlert");
const Authority = require("./models/Authority");
const Report = require("./models/Report");

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const emergencyContactRoutes = require("./routes/emergencyContactRoutes");
const securityAlertRoutes = require("./routes/securityAlertRoutes");
const authorityRoutes = require("./routes/authorityRoutes");
const reportRoutes = require("./routes/reportRoutes");

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/emergency-contacts", emergencyContactRoutes);
app.use("/api/security-alerts", securityAlertRoutes);
app.use("/api/authorities", authorityRoutes);
app.use("/api/reports", reportRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Sync Database and Start Server
sequelize
  .sync({ alter: true }) // Ensures tables match models
  .then(() => {
    console.log("Database connected and models synchronized.");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
