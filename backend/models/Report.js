const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Report = sequelize.define("Report", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Matches the actual table name in DB
      key: "id",
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  timestamps: true, // enables createdAt and updatedAt automatically
  tableName: "Reports", // optional but helps avoid pluralization issues
});

User.hasMany(Report, { foreignKey: "userId" });
Report.belongsTo(User, { foreignKey: "userId" });

module.exports = Report;
