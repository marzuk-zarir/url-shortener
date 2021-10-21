const config = require('config')
const { customAlphabet } = require('nanoid/async')
const Url = require('../model/Url')
const User = require('../model/User')
const { postUrlSchema, deleteUrlSchema } = require('../schema/url-schema')

exports.getAllUrl = async (req, res, next) => {
    try {
        const user = await User.findById(
            req.user.id,
            '-email -password -__v'
        ).populate('urls', '-user -long_url -__v')
        res.json({
            status: 'success',
            message: 'Get all url successfully',
            user
        })
    } catch (err) {
        next(err)
    }
}

exports.postSingleUrl = async (req, res, next) => {
    try {
        const { url } = await postUrlSchema.validateAsync(req.body)

        // Check url is exist or not
        const isExistUrl = await Url.findOne({ long_url: url })
        if (isExistUrl) {
            return res.status(400).json({
                status: 'error',
                error: 'Url already exist'
            })
        }

        // Generate short id
        // If generate 10000/hour id ~92 years needed, in order to have a 1% probability of at least one collision
        const nanoid = await customAlphabet(
            'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            12
        )
        const shortId = await nanoid()
        const shortUrl = new Url({
            long_url: url,
            short_url: config.get('hostname') + '/' + shortId,
            url_code: shortId,
            user: req.user.id
        })
        const saveUrl = await shortUrl.save()
        await User.findByIdAndUpdate(req.user.id, {
            $push: { urls: saveUrl.id }
        })
        res.json({
            status: 'success',
            message: 'Url shorten successful',
            url: {
                id: saveUrl.id,
                short: saveUrl.short_url,
                code: saveUrl.url_code
            }
        })
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({
                status: 'error',
                error: 'Invalid url format'
            })
        }
        next(err)
    }
}

exports.deleteSingleUrl = async (req, res, next) => {
    try {
        const { urlId } = await deleteUrlSchema.validateAsync(req.params)
        const url = await Url.findByIdAndDelete(urlId)
        if (!url) return next()
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { urls: urlId }
        })
        res.json({
            status: 'success',
            message: 'Short url is delete successfully'
        })
    } catch (err) {
        if (err.isJoi) {
            return next()
        }
        next(err)
    }
}
