const jwt = require('jsonwebtoken')
const User = require('../model/User')

module.exports = async (req, res, next) => {
    try {
        const bearerToken = req.headers['authorization']
        const authToken =
            bearerToken && bearerToken.split(' ')[0] === 'Bearer'
                ? bearerToken.split(' ')[1]
                : false
        if (!authToken) {
            return res.status(403).json({
                status: 'error',
                error: 'permission denied'
            })
        }

        // Verify token and find user in database,if exist then bind user with request
        const { id } = await jwt.verify(authToken, process.env.JWT_SECRET)
        const user = await User.findById(id, '-password -urls -__v')
        if (!user) {
            return res.status(403).json({
                status: 'error',
                error: 'permission denied'
            })
        }
        req.user = user
        next()
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({
                status: 'error',
                error: 'Invalid authentication token'
            })
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({
                status: 'error',
                error: 'Token is expired, please login again'
            })
        }
        next(err)
    }
}
