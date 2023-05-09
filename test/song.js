const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, after } = require('mocha');
const app = require('../src/server');
const User = require('../src/models/User');
const Album = require('../src/models/Album');
const Song = require('../src/models/Song');

const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(app);

describe('Song', () => {
    before(async function () {
        const res = await agent
            .post('/users/signup')
            .send({ username: 'testone', password: 'password' });

        const albumRes = await agent
            .post('/albums')
            .send({ title: 'test album', year: '2020', totalTracks: 10, chartPosition: 1, coverArtUrl: 'https://www.google.com', songs: [] });

        const songRes = await agent
            .post('/songs')
            .send({ title: 'test song', length: '3:00', featuredArtists: [], isSingle:false, highestChartPosition:null, singleReleaseDate:null, album: albumRes.body._id });
    });

    describe('Querying songs', () => {
        // Logged in user can query all songs
        it('should be able to query all songs', function (done) {
            agent
                .get('/songs')
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        // Logged in user can query a specific song
        it('should be able to query a specific song', async () => {
            const song = await Song.findOne({ title: 'test song' });
            const res = await agent.get(`/songs/${song._id}`);
            res.should.have.status(200);
            res.should.be.a('object');
        });
    });

    describe('Creating songs', async () => {
        // Logged in user can create a song
        const album = await Album.findOne({ title: 'test album' });
        it('should be able to create a song', function (done) {
            // delete test song
            Song.findOneAndDelete({ title: 'test song' })
            agent
                .post('/songs')
                .send({ title: 'test song', length: '3:00', featuredArtists: [], isSingle:false, highestChartPosition:null, singleReleaseDate:null, album: album._id })
                .end(function (err, res) {
                    res.should.have.status(201);
                    done();
                });
        });
           

        // Logged in user can create a song with a featured artist
        it('should be able to create a song with a featured artist', function (done) {
            // delete test song
            Song.findOneAndDelete({ title: 'test song' })
            agent
                .post('/songs')
                .send({ title: 'test song', length: '3:00', featuredArtists: ['test artist'], isSingle:false, highestChartPosition:null, singleReleaseDate:null, album: albumRes.body._id })
                .end(function (err, res) {
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe('Updating songs', () => {
        // Logged in user can update a song
        it('should be able to update a song', async () => {
            const song = await Song.findOne({ title: 'test song' });
            const res = await agent
                .put(`/songs/${song._id}`)
                .send({ title: 'updated song', length: '3:00' });
            res.should.have.status(200);
            res.should.be.a('object');
        });
    });

    describe('Deleting songs', () => {
        // Logged in user can delete a song
        it('should be able to delete a song', async () => {
            const song = await Song.findOne({ title: 'test song' });
            const res = await agent.delete(`/songs/${song._id}`);
            res.should.have.status(200);
            res.should.be.a('object');
        });
    });

    after(async function () {
        await User.findOneAndDelete({ username: 'testone' });
        await Album.findOneAndDelete({ title: 'test album' });
        await Song.findOneAndDelete({ title: 'test song' });
    });
});

