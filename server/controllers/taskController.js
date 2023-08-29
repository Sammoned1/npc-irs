const { Task, User } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const sequelize = require("../db");

class TaskController {
  async createTask(req, res, next) {
    try {
      // const { task, description, userId } = req.body;
      const {
        task,
        description = "no description",
        progress = 0,
        userId,
        status = userId ? "Working" : "Pending",
      } = req.body;
      if (!task)
        return next(ApiError.badRequest("Ошибка при добавлении задачи"));
      const newTask = Task.create({
        task,
        description,
        status,
        progress,
        user_id: userId,
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

  static async getTasks(limit, offset, assigned) {
    // noinspection SqlType
    const tasks = await sequelize.query(`
            SELECT *
            FROM tasks
            WHERE user_id IS ${assigned ? "NOT" : ""} NULL
--             Тернарные операторы для добавления лимита и оффсета в raw query ${
      limit ? "LIMIT " + limit : ""
    }
             ${offset ? "OFFSET " + offset : ""}
            ORDER BY id DESC
        `);
    return tasks[0];
  }

  async getAllTasks(req, res, next) {
    try {
      const { limit, offset, userId, assigned } = req.query;
      if (userId) {
        //Получение тасков, присвоенных пользователю
        const tasks = await sequelize.query(`
                    SELECT *
                    FROM tasks
                    WHERE user_id = ${userId}
                `);
        return res.json(tasks);
      } else {
        const tasks = await TaskController.getTasks(limit, offset, assigned);
        return res.json(tasks);
      }
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async deleteTask(req, res, next) {
    try {
      const { selectedIds } = req.body;
      await sequelize.query(`
                DELETE
                FROM tasks
                WHERE id IN (${selectedIds})
            `);
      return res.json(`tasks ${selectedIds} were deleted`);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new TaskController();
