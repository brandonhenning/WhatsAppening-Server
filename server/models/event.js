const mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    title: String,
    category: String,
    location: Object,
    date: String,
    time: String,
    description: String,
    imageURL: String,
    pins: Array,
    upvotes: Number
})

module.exports = mongoose.model('Event', EventSchema)