const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Add your models here.
const MessageSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref:"User", required: true },
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message
