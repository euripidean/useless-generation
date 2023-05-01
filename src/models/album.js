const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Album Model

const AlbumSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    totalTracks: { type: Number, required: true },
    chartPosition: { type: Number, required: true },
    coverArtUrl: { type: String, required: true },
})

const Album = mongoose.model('Album', AlbumSchema)

module.exports = Album
