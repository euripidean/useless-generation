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

        await AlbumModel.create(albums);
        console.log('Album data successfully loaded');
        await SongModel.create(songsWithDates);
        console.log('Song data successfully loaded');
        
    } catch (err) {
        console.log(err);
    }
};

populateDatabase();

module.exports = populateDatabase;

