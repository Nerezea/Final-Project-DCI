import joi from "joi";

export const createEventSchema = joi.object({
  title: joi.string().required(),
  description: joi.string().required(),
  start: joi.date().required(),
  end: joi.date().greater(joi.ref("start")).allow(null, ""),
  class: joi.objectId().allow("", null),
  hasConsent: joi.boolean().required(),
});
