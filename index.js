require('dotenv').config()
const express = require('express')
const dbConnect = require('./config/database')
const requireAuth = require('./middleware/requireAuth')
const authRouter = require('./router/auth-router')
const indexRouter = require('./router/index-router')
const shortUrlRouter = require('./router/shorturl-router')

const app = express()
const port = process.env.PORT || 3000

// Connect to database
dbConnect()

// Router & middleware
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/shorten', requireAuth, shortUrlRouter)
app.use('/', indexRouter)

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        status: '404 not found',
        message: 'Requested url not found'
    })
})

// 500 handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})
