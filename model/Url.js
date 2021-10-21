const { Schema, model, SchemaTypes } = require('mongoose')

const urlSchema = new Schema({
    short_url: {
        type: String,
        length: 15,
        required: true
    },
    long_url: {
        type: String,
        required: true
    },
    url_code: {
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
