import Joi from "joi";

// it returns the schema that will be a function to which we can pass an object and validate it, if the properties are correct they will return an object
// and if not, it returns an exception that we can catch with the catch

const product = Joi.object({
    name: Joi.string().min(3).max(45).required(),
    description: Joi.string().min(5).max(60).required(),
    code: Joi.string().min(3).max(8).required(),
    thumbnail: Joi.string().min(5).max(180).required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
});

export const JOI_VALIDATOR = {
    product,
};