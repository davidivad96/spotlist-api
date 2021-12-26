import { Joi } from 'express-validation';

const listCreateValidation = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&_])(?=.*[a-zA-Z\d@$!%*#?&_]).{8,}$/);
const userCreateValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required().regex(passwordRegex),
  }),
};

const loginValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export { listCreateValidation, userCreateValidation, loginValidation };
