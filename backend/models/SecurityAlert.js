const { DataTypes } = require("sequelize"); 
const sequelize = require("../config/database"); 
const User = require("./User");


const SecurityAlert = sequelize.define("SecurityAlert", {
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
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(SecurityAlert, { foreignKey: "userId" });
SecurityAlert.belongsTo(User, { foreignKey: "userId" });

module.exports = SecurityAlert;
