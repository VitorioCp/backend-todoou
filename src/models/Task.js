// Model Task
const { DataTypes } = require("sequelize");
const sequelize = require("./connection");
const GroupTasks = require("./GroupTasks");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  statusTask: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATE,
  },
  groupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


Task.belongsTo(GroupTasks, { foreignKey: 'groupId', onDelete: 'CASCADE' });
GroupTasks.hasMany(Task, { foreignKey: 'groupId', onDelete: 'CASCADE' });

module.exports = Task;
