import joi from "joi";

export const createEventSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  date: joi.date().required(),
  class: joi.objectId(),
  hasConsent: joi.boolean().required(),
});
