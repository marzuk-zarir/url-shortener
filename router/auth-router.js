const authRouter = require('express').Router()
const { postSignup, postLogin } = require('../controller/auth-controller')

authRouter.post('/signup', postSignup)
authRouter.post('/login', postLogin)

module.exports = authRouter
