require("dotenv").config();
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE || "./database.sqlite", // caminho do arquivo
  logging: false, 
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com SQLite estabelecida com sucesso.");
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
  });

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // recria tabelas
    console.log("Tabelas sincronizadas com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
  }
};

syncDatabase();

module.exports = sequelize;
