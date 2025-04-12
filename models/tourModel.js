const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    maxGroupSize: { type: Number, required: true },
    difficult: { type: String, required: true }
})

const Tour = mongoose.model('Tour', tourSchema)

module.exports = Tour