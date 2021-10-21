const { Schema, model, SchemaTypes } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 13,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 20,
        required: true
    },
    urls: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Url'
        }
    ]
})

// Hash before saving password
userSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    } catch (err) {
        next(err)
    }
})

module.exports = model('User', userSchema)
