import Joi from "joi";
import './objectIdSchema.js'

export const createStudentByManagerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
  class: Joi.objectId().required(),
  birthDay : Joi.string().required(),
  address : Joi.string().required(),
  phone : Joi.string().required(),
  image : Joi.string().allow(""),
});


export const updateStudentByManagerSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
  fullName: Joi.string(),
  class: Joi.objectId(),
  birthDay : Joi.string(),
  address : Joi.string(),
  phone : Joi.string(),
  image : Joi.string().allow(""),
});

