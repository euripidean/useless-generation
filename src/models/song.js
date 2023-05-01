const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Song Model

const SongSchema = new Schema({
    title: { type: String, required: true },
    length: { type: String, required: true },
    featuredArtists: [{ type: String, required: false, default: null }],
    isSingle: { type: Boolean, required: true },
    highestChartPosition: { type: Number, required: false, default: null },
    singleReleaseDate: { type: Date, required: false },
    // album: { type: Schema.Types.ObjectId, ref:"Album" },
})

const Song = mongoose.model('Song', SongSchema)

module.exports = Song

