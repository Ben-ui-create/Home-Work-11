import {Router} from 'express';

import controller from '../controllers/users.js';

import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/users.schema.js';
import auth from '../middlewares/authorization.js';

const router = Router();

router.post(
  '/login',
  validation(schema.login, 'body'),
  controller.login,
);

router.post(
  '/register',
  validation(schema.register, 'body'),
  controller.register,
);

router.get(
  '/profile',
  auth,
  controller.profile,
);

router.put(
  '/profile',
  auth,
  validation(schema.update, 'body'),
  controller.update,
);

router.get(
  '/list',
  auth,
  validation(schema.getUsersList, 'body'),
  controller.getUsersList,
);

// views
router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

export default router;