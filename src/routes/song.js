const express = require('express')
const router = express.Router();

const Song = require('../models/Song');

/** Async Await Route to get all songs. */
router.get('/', async (req, res) => {
    try {
        const songs = await Song.find().populate('album');
        return res.json({ songs });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});


/** Async Await Route to get one song by id. */
router.get('/:songId', async (req, res) => {
    const { songId } = req.params;
    try {
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        return res.json({ song });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

/** Async await Route to add a new song. */
router.post('/', async (req, res) => {
    const { title, length, featuredArtists, isSingle, highestChartPosition, releaseDate, album } = req.body;
    try {
        const song = await Song.create({ title, length, featuredArtists, isSingle, highestChartPosition, releaseDate, album });
        return res.status(201).json({ song });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

/** Async await route to update a song by id */
router.put('/:songId', async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate(req.params.albumId, req.body, { new: true });
        return res.json({ song });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

/** Async await route to delete a song. */
router.delete('/:songId', async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.songId);
        return res.json({ song });
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router

