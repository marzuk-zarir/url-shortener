const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

exports.getUrlSchema = Joi.object({
    urlCode: Joi.string()
        .length(12)
        .regex(
            /[abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ]{12}/
        )
})

exports.postUrlSchema = Joi.object({
    url: Joi.string().regex(
        /^((ftp|http|https):\/\/)?(www\.)?([A-z]+)\.([A-z]{2,})/u
    )
})

exports.deleteUrlSchema = Joi.object({
    urlId: Joi.objectId()
})
