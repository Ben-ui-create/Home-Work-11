import {Router} from 'express';

import usersRouter from './users.js';
import tasksRouter from './task.js';

const router = Router();


router.get('/', function (req, res, next) {
  res.render('home');
});

router.use('/users', usersRouter);
router.use('/tasks', tasksRouter);

export default router;