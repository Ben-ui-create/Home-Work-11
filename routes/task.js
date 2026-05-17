import {Router} from 'express';

import controller from '../controllers/task.js';

import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/tasks.schema.js';
import auth from '../middlewares/authorization.js';

const router = Router();

router.post(
  '/create',
  validation(schema.create, 'body'),
  // auth,
  controller.create,
);

router.put(
  '/update',
  validation(schema.update, 'body'),
  // auth,
  controller.update,
);

router.delete(
  '/delete',
  // auth,
  controller.deleteTask,
);

router.get(
  '/list',
  validation(schema.getTasksList, 'body'),
  // auth,
  controller.getTaskList,
);

router.get('/tasks', (req, res) => {
  res.render('tasks');
});

export default router;