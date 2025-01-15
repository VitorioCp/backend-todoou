const { DataTypes } = require("sequelize");
const sequelize = require("./connection");
const User = require("./User"); // Importe o modelo User

const GroupTasks = sequelize.define("GroupTasks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  groupTitle: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  userId: { // Chave estrangeira para associar ao usuário
    type: DataTypes.INTEGER,
    references: {
      model: User, // Referencia o modelo User
      key: "id_user", // Define qual campo será usado na relação
    },
    onDelete: "CASCADE", // Remove o GroupTasks se o usuário for deletado
  },
});

User.hasMany(GroupTasks, {
  foreignKey: "userId",
  onDelete: "CASCADE", // Remove as tarefas do grupo se o usuário for deletado
});

GroupTasks.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = GroupTasks;
