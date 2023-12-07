import Joi from "joi";

export const createTeacherSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  fullName: Joi.string().required(),
  phone: Joi.string().required(),
  image: Joi.string(),
});


export const updateTeacherSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6),
  fullName: Joi.string(),
  phone: Joi.string(),
  image: Joi.string(),
});
