import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string().required().messages({
        "string.required":" username is required",
    }),
    password: Joi.string().required()
})

