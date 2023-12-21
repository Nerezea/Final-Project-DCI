import joi from "joi";

export const createSickRestSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  from: joi.date().required(),
  to: joi.date().required(),
  image: joi.string(),

});
