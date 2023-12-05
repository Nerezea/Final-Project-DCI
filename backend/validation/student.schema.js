import Joi from "joi";

export const createStudentByManagerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
  class: Joi.string().required(),
  birthDay : Joi.string().required(),
  tel : Joi.string().required(),
});
