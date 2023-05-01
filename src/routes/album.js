const express = require('express')
const router = express.Router();

const Album = require('../models/Album');

/** Async Await Route to get all albums. */
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find();
        return res.json({ albums });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/** Async Await Route to get one album by id. */
router.get('/:albumId', async (req, res) => {
    const { albumId } = req.params;
    try {
        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        return res.json({ album });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

/** Async await Route to add a new album. */
router.post('/', async (req, res) => {
    const { title, year, totalTracks, chartPosition, coverArtUrl  } = req.body;
    try {
        const album = await Album.create({ title, year, totalTracks, chartPosition, coverArtUrl });
        return res.status(201).json({ album });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

/** Async await route to update a album by id */
router.put('/:albumId', async (req, res) => {
    try {
        const album = await Album.findByIdAndUpdate(req.params.albumId, req.body, { new: true });
        return res.json({ album });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

/** Async await route to delete an album. */
router.delete('/:albumId', async (req, res) => {
    try {
        const album = await Album.findByIdAndDelete(req.params.albumId);
        return res.json({ album });
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router
