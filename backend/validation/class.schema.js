import Joi from "joi";

export const createClassSchema = Joi.object({
  name: Joi.string().required(),
  teacher: Joi.string().required(),
});
