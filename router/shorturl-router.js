const shortUrlRouter = require('express').Router()
const {
    getAllUrl,
    postSingleUrl,
    deleteSingleUrl
} = require('../controller/shorturl-controller')

shortUrlRouter.get('/', getAllUrl)
shortUrlRouter.post('/', postSingleUrl)
shortUrlRouter.delete('/:urlId', deleteSingleUrl)

module.exports = shortUrlRouter
