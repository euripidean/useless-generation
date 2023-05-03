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
    album: { type: Schema.Types.ObjectId, ref: 'Album' },
})

SongSchema.pre('save', async function(next) {
    if (this.album) {
        try {
            const album = await mongoose.model('Album').findById(this.album)
            album.songs.push(this._id)
            await album.save()
        } catch (err) {
            next(err)
        }
    }
    next()
})

const Song = mongoose.model('Song', SongSchema)

module.exports = Song;

