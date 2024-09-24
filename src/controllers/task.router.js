const Task = require("../models/Task");
const moment = require("moment"); // Para formatação de datas

class TaskController {
  async create(req, res) {
    const { title, description, statusTask, data, groupId } = req.body;

    try {


      const response = await Task.create({
        title,
        description,
        statusTask,
        data: data, 
        groupId,
      });

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async getAll(req, res) {
    try {
      const response = await Task.findAll();
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    
    try {
      const task = await Task.findByPk(id);
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }



      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { title, description, statusTask, data } = req.body;
  
    try {
      const task = await Task.findByPk(id);
  
      if (!task) {
        return res.status(404).json({ message: "Task não encontrada" });
      }


      await task.update({
        title: title || task.title,
        description: description || task.description,
        statusTask: statusTask !== undefined ? statusTask : task.statusTask,
        data: data || task.data
      });
  
      return res.status(200).json({ message: "Task atualizada com sucesso", task });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao tentar atualizar a task", error });
    }
  }

  async delete(req, res) {
    const { id } = req.params; 

    try {
      const task = await Task.findByPk(id);

      if (!task) {
        return res.status(404).json({ message: "Task não encontrada" });
      }

      await task.destroy();

      return res.status(200).json({ message: "Task excluída com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }
}

module.exports = TaskController;
