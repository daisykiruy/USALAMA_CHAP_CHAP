const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const EmergencyContact = sequelize.define("EmergencyContact", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {               // ✅ Use this for clarity and consistency
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relationships
User.hasMany(EmergencyContact, { foreignKey: "userId" });
EmergencyContact.belongsTo(User, { foreignKey: "userId" });

module.exports = EmergencyContact;
