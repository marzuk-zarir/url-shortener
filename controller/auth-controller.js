const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const { signupSchema, loginSchema } = require('../schema/user-schema')

exports.postSignup = async (req, res, next) => {
    try {
        const { username, email, password } = await signupSchema.validateAsync(
            req.body
        )

        // Check existing user with same username
        const isExistingUser = await User.findOne({ username })
        if (isExistingUser !== null) {
            return res.status(403).json({
                status: 'error',
                error: 'Username is already registered'
            })
        }

        // Create user
        const user = new User({ username, email, password })
        await user.save()
        res.status(201).json({
            status: 'success',
            message: 'User is created successfully'
        })
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({
                status: 'error',
                error: "Request body doesn't fill the requirement"
            })
        }
        next(err)
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const { username, password } = await loginSchema.validateAsync(req.body)

        // Find user by username
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(403).json({
                status: 'error',
                error: 'Invalid credentials'
            })
        }

        // Compare password
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(403).json({
                status: 'error',
                error: 'Invalid credentials'
            })
        }

        // Send jwt token
        const token = await jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE_IN }
        )
        res.json({
            status: 'success',
            message: 'Login successful',
            auth_token: token
        })
    } catch (err) {
        if (err.isJoi) {
            return res.status(400).json({
                status: 'error',
                error: "Request body doesn't fill the requirement"
            })
        }
        next(err)
    }
}
