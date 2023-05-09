const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Album Model

const AlbumSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    totalTracks: { type: Number, required: true },
    chartPosition: { type: Number, required: true },
    coverArtUrl: { type: String, required: true },
    songs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
})

AlbumSchema.pre('findOne', function (next) {
    this.populate('songs')
    next()
})

AlbumSchema.pre('find', function (next) {
    this.populate('songs')
    next()
})

const Album = mongoose.model('Album', AlbumSchema)

module.exports = Album
