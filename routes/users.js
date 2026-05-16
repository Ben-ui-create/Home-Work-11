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

export default router;