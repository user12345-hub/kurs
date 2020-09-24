const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    theme: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: 'users'}
})

module.exports = model('myCollections', schema)