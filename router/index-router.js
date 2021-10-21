const indexRouter = require('express').Router()
const Url = require('../model/Url')
const { getUrlSchema } = require('../schema/url-schema')

indexRouter.get('/:urlCode', async (req, res, next) => {
    try {
        const { urlCode } = await getUrlSchema.validateAsync(req.params)
        const url = await Url.findOne({
            url_code: urlCode
        })
        if (!url) return res.status(404).send('Requested url not found')
        res.redirect(url.long_url)
    } catch (err) {
        if (err.isJoi) return next()
        next(err)
    }
})

module.exports = indexRouter
