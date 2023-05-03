const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const AlbumModel = require('./models/Album');
const SongModel = require('./models/Song');

const populateDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        const albums = JSON.parse(fs.readFileSync(`${__dirname}/albums.json`, 'utf-8'));
        const songs = JSON.parse(fs.readFileSync(`${__dirname}/songs.json`, 'utf-8'));

        const songsWithDates = songs.map(song => ({
            ...song,
            singleReleaseDate: song.singleReleaseDate !== null ? new Date(song.singleReleaseDate) : null,
          }));
          

        // Delete all album data from DB
        await AlbumModel.deleteMany({});

        // Delete all song data from DB
        await SongModel.deleteMany({});

        await AlbumModel.create(albums, { validateBeforeSave: false });
        console.log('Album data successfully loaded');

        //loop through every song. If the album matches the name of a Album in the database, replace the album value with the album id
        const albumIds = await AlbumModel.find().select('_id title');
        const albumIdMap = albumIds.reduce((acc, album) => {
            acc[album.title] = album._id;
            return acc;
        }
        , {});

        const songsWithAlbumIds = songsWithDates.map(song => {
            const newSong = { ...song };
            newSong.album = albumIdMap[song.album];
            return newSong;
        });

        //Build songs in the database
        await SongModel.create(songsWithAlbumIds, { validateBeforeSave: true });
        console.log('Song data successfully loaded and related to albums');

        //Middleware on Songs Model should handle pushing the Song ID to the Album's songs array.
    } catch (err) {
        console.log(err);
    }
};

populateDatabase();

module.exports = populateDatabase;

