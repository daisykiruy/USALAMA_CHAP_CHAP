const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Authority = sequelize.define(
  "Authority", // ✅ Capitalized model name
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "authority", // e.g., police, administrator, etc.
    },
  },
  {
    tableName: "authority", // ✅ Forces the table name to stay "authority"
    timestamps: false, // ✅ Disables createdAt & updatedAt
  }
);

module.exports = Authority; // ✅ Capitalized when exporting
