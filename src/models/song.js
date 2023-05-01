const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Song Model

const SongSchema = new Schema({
    title: { type: String, required: true },
    length: { type: String, required: true },
    featured_artists: [{ type: String, required: false, default: null }],
    is_single: { type: Boolean, required: true },
    highest_chart_position: { type: Number, required: false, default: null },
    release_date: { type: Date, required: true },
    album: { type: Schema.Types.ObjectId, ref:"Album" },
})

const Song = mongoose.model('Song', SongSchema)

module.exports = Song

