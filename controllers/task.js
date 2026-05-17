import Tasks from '../models/task.js';

export default {
  async getTaskList(req, res, next) {
    try {
      const data = await Tasks.getTaskList(
        req.query.page,
        req.query.limit,
      );

      res.json(data);
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      const {title, description, taskDate} = req.body;

      const task = await Tasks.create({
        title,
        description,
        taskDate,
      });

      res.json({
        message: 'Task created successfully.',
        task,
      });
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const {title, description, taskDate, id} = req.body;

      const task = await Tasks.update(
        {title, description, taskDate, id},
      );

      res.json({
        message: 'Task updated successfully.',
        task,
      });
    } catch (e) {
      next(e);
    }
  },

  async deleteTask(req, res, next) {
    try {
      const {id} = req.body;

      const task = await Tasks.deleteTask(id);

      res.json({
        message: 'Task deleted successfully.',
        task,
      });
    } catch (e) {
      next(e);
    }
  }
}
