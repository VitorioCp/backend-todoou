const { DataTypes } = require("sequelize");
const sequelize = require("./connection");
const GroupTasks = require("./GroupTasks");
const User = require("./User");

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
  userId: {
    type: DataTypes.INTEGER, // Chave estrangeira para o User
    references: {
      model: User,
      key: "id_user", // Relaciona com o campo id_user no modelo User
    },
    allowNull: false,
  },
  groupTaskId: {
    type: DataTypes.INTEGER, // Chave estrangeira para o GroupTasks
    references: {
      model: GroupTasks,
      key: "id", // Relaciona com o campo id no modelo GroupTasks
    },
    allowNull: true, // Pode ser nulo, caso a tarefa não pertença a um grupo específico
  },
});

// Associações
User.hasMany(Task, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Task.belongsTo(User, {
  foreignKey: "userId",
});

GroupTasks.hasMany(Task, {
  foreignKey: "groupTaskId",
  onDelete: "CASCADE",
});

Task.belongsTo(GroupTasks, {
  foreignKey: "groupTaskId",
});

module.exports = Task;
