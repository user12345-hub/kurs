const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    setItems: [{type: Types.ObjectId, ref: 'myCollections'}]
})

module.exports = model('users', schema)