const config = require('config')
const { connect } = require('mongoose')

const dbConnect = async () => {
    try {
        connect(config.get('database.url'))
        console.log('Database connection successful 🚀')
    } catch (err) {
        console.error(err)
        process.env.exit(1)
    }
}

module.exports = dbConnect
