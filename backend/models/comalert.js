const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const comalert = sequelize.define("comalert", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  senderName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Admin",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "comalert", // Ensures the table is named exactly "comalert"
  timestamps: false,     // Disables Sequelize's automatic updatedAt
});

module.exports = comalert;
