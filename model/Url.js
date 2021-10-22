const { Schema, model, SchemaTypes } = require('mongoose')

const urlSchema = new Schema({
    short: {
        type: String,
        length: 15,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    code: {
        type: String,
        length: 12,
        required: true
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = model('Url', urlSchema)
