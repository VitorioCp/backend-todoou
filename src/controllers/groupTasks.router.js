const GroupTasks = require("../models/GroupTasks");

class GroupTasksController {
  async create(req, res) {
    const { groupTitle } = req.body;
    const userId = req.user.id_user;

    try {
      const response = await GroupTasks.create({ groupTitle, userId });

      res
        .status(201)
        .json({ message: "Grupo de tarefa criado com sucesso", response });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao tentar criar o grupo de tarefas", error });
    }
  }

  async put(req, res) {
    const { id } = req.params;
    const { groupTitle } = req.body;

    try {
      const response = await GroupTasks.findByPk(id);

      if (!response) {
        res.status(404).json({ message: "Grupo não encontrado" });
      }

      response.groupTitle = groupTitle;

      await response.save();

      res.json({ message: "Grupo atualizado com sucesso", response });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao tentar criar o grupo de tarefas", error });
    }
  }

  //Buscar os grouptasks por userId
  async getAll(req, res) {
    try {
      // O middleware authMiddleware adiciona o userId ao req.user
      const userId = req.user.id_user; // Pega o userId do token decodificado
  
      // Filtra os GroupTasks pelo userId
      const groupTasks = await GroupTasks.findAll({
        where: { userId: userId }, // Retorna apenas os GroupTasks do usuário autenticado
      });
  
      res.status(200).json(groupTasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar os GroupTasks" });
    }
  }
  

  async delete(req, res) {
    const { id } = req.params;

    try {
      const taskGroup = await GroupTasks.findByPk(id);

      if (!taskGroup) {
        return res
          .status(404)
          .json({ message: "Grupo de tarefas não encontrado" });
      }

      // Deletando o grupo e todas as tarefas relacionadas
      await taskGroup.destroy();

      return res
        .status(200)
        .json({ message: "Grupo e tarefas excluídos com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro interno do servidor", error });
    }
  }
}

module.exports = GroupTasksController;
