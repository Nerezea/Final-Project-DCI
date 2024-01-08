import Joi from "joi";

const passwordSchema = Joi.string().min(6);

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: passwordSchema.required(),
});

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  fullName: Joi.string().required(),
  password: passwordSchema.required(),
  phone: Joi.string().required(),
  image: Joi.string().allow(""),
  birthDay: Joi.string().required(),
  address: Joi.string().required(),
  class: Joi.string().required(),
});

export const editProfileSchema = Joi.object({
  fullName: Joi.string(),
  phone: Joi.string(),
  image: Joi.string()
});


export const changePasswordSchema = Joi.object({
  newPassword: Joi.string(),
  oldPassword: Joi.string(),
});
