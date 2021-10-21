const Joi = require('joi')

exports.signupSchema = Joi.object({
    username: Joi.string().trim().alphanum().min(4).max(13).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).max(20).required(),
    confirm_password: Joi.ref('password')
})

exports.loginSchema = Joi.object({
    username: Joi.string().trim().alphanum().min(4).max(13).required(),
    password: Joi.string().min(8).max(20).required()
})
