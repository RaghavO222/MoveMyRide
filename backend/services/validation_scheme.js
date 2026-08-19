const Joi = require("joi");

const registrationValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
   
});

const loginValidation = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
   
});

const addRegistrationValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
});

module.exports = { registrationValidation, loginValidation, addRegistrationValidation };