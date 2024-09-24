const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const GroupTasks = sequelize.define("GroupTasks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  groupTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
});

module.exports = GroupTasks;