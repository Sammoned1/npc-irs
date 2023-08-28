const { Task } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");

class TaskController {
  async createTask(req, res, next) {
    try {
      const {
        task,
        description = "no description",
        status = "working",
        progress = 0,
        userId,
      } = req.body;
      if (!userId || !task)
        return next(ApiError.badRequest("Ошибка при добавлении задачи"));

      const newTask = Task.create({
        task,
        description,
        status,
        progress,
        userId,
      });
      return res.json({ newTask });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getTask(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.badRequest("Некорректный taskId"));
      }
      const task = await Task.findOne({ where: { id } });
      if (!task)
        return next(ApiError.badRequest("Задача с таким id не найдена"));
      return res.json({ task });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAllTasks(req, res, next) {
    try {
      const { limit, offset } = req.query;
      const tasks = await Task.findAll({
        limit,
        offset,
        order: [ ["id", "DESC"] ],
      });
      return res.json(tasks);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new TaskController();
