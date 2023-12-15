import joi from "joi";

export const createFeedSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  date: joi.date().required(),
  class: joi.objectId(),
  image: joi.string().required(),
});
