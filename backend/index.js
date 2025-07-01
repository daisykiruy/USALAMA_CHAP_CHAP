require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const http = require("http"); // Needed for socket.io
const socketIO = require("socket.io");
const sequelize = require("./config/database");

// Import models (Ensures Sequelize recognizes them)
const User = require("./models/User");
const EmergencyContact = require("./models/EmergencyContact");
const SecurityAlert = require("./models/SecurityAlert");
const Authority = require("./models/Authority");
const Report = require("./models/Report");
const ComAlert = require("./models/comalert"); // ✅ Added model (optional if needed here)

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const emergencyContactRoutes = require("./routes/emergencyContactRoutes");
const securityAlertRoutes = require("./routes/securityAlertRoutes");
const authorityRoutes = require("./routes/authorityRoutes");
const reportRoutes = require("./routes/reportRoutes");
const comalertRoutes = require("./routes/comalertRoutes"); // ✅ Added this

// Initialize Express app
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = socketIO(server, {
  cors: {
    origin: "*", // Allow frontend connection
  },
});

// Attach io to the app for global access in controllers
app.set("io", io);

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
app.use("/api/comalerts", comalertRoutes); // ✅ Register comalert routes

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Socket.IO connection log (optional)
io.on("connection", (socket) => {
  console.log("🟢 A client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Sync Database and Start Server
sequelize
  .sync({ alter: true }) // Ensures tables match models
  .then(() => {
    console.log("✅ Database connected and models synchronized.");
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error syncing database:", error);
  });
