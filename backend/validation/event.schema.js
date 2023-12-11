import joi from "joi";

export const createEventSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(), 
  start: joi.date().required(),
  end: joi.date().required(),
 
});
