const axios = require("axios");
const { Op, Sequelize } = require("sequelize");
const SecurityAlert = require("../models/SecurityAlert");
const EmergencyContact = require("../models/EmergencyContact");
const User = require("../models/User");
const twilio = require("twilio");

// Twilio setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send Alert with Twilio and Socket.IO
exports.sendAlert = async (req, res) => {
  try {
    console.log("📥 Incoming request body:", req.body);
    const { userId, location, timestamp, media, type } = req.body; // ✅ included type
    console.log("➡️ Incoming alert from user:", userId, location, timestamp);

    if (!userId || !location || !timestamp || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [lat, lon] = location.split(",");
    let town = "Unknown";
    try {
      const geoRes = await axios.get("https://nominatim.openstreetmap.org/reverse", {
        params: {
          format: "json",
          lat,
          lon,
        },
        headers: {
          "User-Agent": "UsalamaChapChapApp/1.0 (contact@usalama.com)",
        },
      });

      town =
        geoRes.data?.address?.city ||
        geoRes.data?.address?.town ||
        geoRes.data?.address?.village ||
        "Unknown";

      console.log("📍 Location resolved to:", town);
    } catch (geoError) {
      console.error("❌ Reverse geocoding failed:", geoError.message);
    }

    const alert = await SecurityAlert.create({
      userId,
      location,
      timestamp,
      town,
      type, // ✅ added type to save in DB
      media: media || null,
    });

    // 🔊 Emit socket
    const io = req.app.get("io");
    io.emit("new-alert", alert);
    console.log("📢 Alert broadcasted via socket");

    // 🧑‍🤝‍🧑 Fetch user + contacts
    const user = await User.findByPk(userId);
    const name = user?.name || "Someone";
    const contacts = await EmergencyContact.findAll({ where: { userId } });

    console.log(`📲 Found ${contacts.length} emergency contacts for ${name}`);

    for (const contact of contacts) {
      const room = `contact-${contact.phone}`;
      io.to(room).emit("contact-alert", { alert, contact });

      // ☎️ Format phone number
      let formattedPhone = contact.phone;
      if (formattedPhone.startsWith("0")) {
        formattedPhone = `+254${formattedPhone.slice(1)}`;
      } else if (!formattedPhone.startsWith("+")) {
        formattedPhone = `+${formattedPhone}`;
      }

      console.log(`📤 Sending SMS to ${formattedPhone}...`);

      try {
        const twilioRes = await client.messages.create({
          body: `${name} may be in danger. A security alert was triggered near ${town}.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: formattedPhone,
        });

        console.log(`✅ SMS sent to ${formattedPhone}: SID=${twilioRes.sid}`);
      } catch (smsError) {
        console.error(`❌ SMS to ${formattedPhone} failed:`, smsError.message);
      }
    }

    res.status(201).json({ message: "Alert sent successfully", alert });
  } catch (error) {
    console.error("❌ General alert failure:", error);
    res.status(500).json({ error: "Failed to send alert" });
  }
};

// 📝 Create an alert manually (no SMS)
exports.createAlert = async (req, res) => {
  try {
    const alert = await SecurityAlert.create(req.body);
    res.status(201).json(alert);
  } catch (error) {
    res.status(500).json({ error: "Error creating security alert" });
  }
};

// 📥 Get all alerts
exports.getAlerts = async (req, res) => {
  try {
    const alerts = await SecurityAlert.findAll();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching alerts" });
  }
};

// 🕓 Get alerts from the last 24 hours
exports.getRecentAlerts = async (req, res) => {
  try {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const alerts = await SecurityAlert.findAll({
      where: { timestamp: { [Op.gte]: since } },
    });
    res.status(200).json(alerts);
  } catch (error) {
    console.error("Error fetching recent alerts:", error);
    res.status(500).json({ error: "Failed to fetch recent alerts" });
  }
};

// 📊 Get statistics for dashboard
exports.getAlertStats = async (req, res) => {
  try {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const weekStart = new Date();
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);
    const yearStart = new Date(now.getFullYear(), 0, 1);

    const today = await SecurityAlert.count({ where: { timestamp: { [Op.gte]: todayStart } } });
    const week = await SecurityAlert.count({ where: { timestamp: { [Op.gte]: weekStart } } });
    const year = await SecurityAlert.count({ where: { timestamp: { [Op.gte]: yearStart } } });

    // ✅ Top towns for the year
    const topTowns = await SecurityAlert.findAll({
      attributes: ["town", [Sequelize.fn("COUNT", Sequelize.col("town")), "count"]],
      where: { timestamp: { [Op.gte]: yearStart } },
      group: ["town"],
      order: [[Sequelize.literal("count"), "DESC"]],
      limit: 5,
    });

    res.status(200).json({ today, week, year, topTowns });
  } catch (error) {
    console.error("Failed to fetch alert statistics:", error);
    res.status(500).json({ error: "Failed to fetch alert statistics" });
  }
};
