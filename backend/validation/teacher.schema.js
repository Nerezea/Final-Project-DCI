import Joi from "joi";

export const createTeacherSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
  fullName: Joi.string().required(),
});
