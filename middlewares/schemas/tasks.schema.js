import Joi from 'joi';

export default {
  create: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    taskDate: Joi.date().required(),
  }),

  update: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    taskDate: Joi.date().required(),
  }),

  getTasksList: Joi.object({
    page: Joi.number().min(1).max(1000).default(1),
    limit: Joi.number().min(5).max(200).default(20),
  }),
}