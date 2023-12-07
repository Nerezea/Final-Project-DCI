import Joi from "joi";

// for more info : https://www.npmjs.com/package/joi
export const validate = (schema) => (req, res, next) => {
    const {error} = schema.validate(req.body,{allowUnknown:true })
    if (error)
        return res.status(400).send({message: error.message})

    next();
}
