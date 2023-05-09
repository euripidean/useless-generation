const express = require('express')
const router = express.Router();
const Album = require('../models/Album');
const Song = require('../models/Song');

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

/** Async await Route to get album by name  */
router.get('name/:albumName', async (req, res) => {
    const { albumName } = req.params;
    try {
        //find album by name searching the title without spaces and all lower case
        const album = await Album.findOne({ title: albumName.toLowerCase().replace(/\s/g, '') });
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

/** Async await route to get the details of all songs on album */
router.get('/:albumId/songs', async (req, res) => {
    try {
        const album = await Album.findById(req.params.albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const songs = await Song.find({ album: album._id });
        return res.status(200).json({ songs });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
  });

/** Async await route to add a song to an album by album id */
router.post('/:albumId/songs', async (req, res) => {
    const { title, length, featuredArtists, isSingle, highestChartPosition, releaseDate } = req.body;
    try {
        const album = await Album.findById(req.params.albumId);
        if (!album) {
            return res.status(404).json({ message: 'Album not found' });
        }
        const song = await Song.create({ title, length, featuredArtists, isSingle, highestChartPosition, releaseDate, album: album._id });
        return res.status(201).json({ song });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router
