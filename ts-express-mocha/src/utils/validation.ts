import { Joi } from 'express-validation';

const listCreateValidation = {
  body: Joi.object({
    list: Joi.object({
      name: Joi.string().required(),
      songs: Joi.array().items(Joi.object({ title: Joi.string().required(), artist: Joi.string().required() })),
    }).required(),
  }),
};

const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&_])(?=.*[a-zA-Z\d@$!%*#?&_]).{8,}$/);
const userCreateValidation = {
  body: Joi.object({
    user: Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required().regex(passwordRegex),
    }),
  }),
};

export { listCreateValidation, userCreateValidation };
