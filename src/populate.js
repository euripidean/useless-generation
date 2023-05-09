const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const AlbumModel = require('./models/Album');
const SongModel = require('./models/Song');
const UserModel = require('./models/User');

const populateDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

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

        //Middleware on Songs Model should handle pushing the Song ID to the Album's songs array.

        // Delete all user data from DB
        await UserModel.deleteMany({});

        // Create a user
        await UserModel.create({
            username: 'testuser',
            password: 'testpassword',
        });

    } catch (err) {
        console.log(err);
    }
};

module.exports = populateDatabase;

