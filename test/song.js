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

const SAMPLE_ID = 'aaaaaaaaaaaa'; // 12 byte string

describe('Song', () => {
    let token;

    before(async function () {
        const res = await agent
            .post('/users/signup')
            .send({ username: 'testone', password: 'password' });

        const loginRes = await agent
            .post('/users/login')
            .send({ username: 'testone', password: 'password' });

        token = loginRes.body.token;


        const albumRes = await agent
            .post('/albums')
            .send({ title: 'test album', year: '2020', totalTracks: 10, chartPosition: 1, coverArtUrl: 'https://www.google.com', songs: [] });

        const songRes = await agent
            .post('/songs')
            .send({ id:SAMPLE_ID, title: 'test song', length: '3:00', featuredArtists: [], isSingle:false, highestChartPosition:null, singleReleaseDate:null, album: albumRes.body._id });
    });

    describe('Querying songs', () => {
        // Logged in user can query all songs
        it('should be able to query all songs', function (done) {
            agent
                .get('/songs')
                .set('Authorization', `Bearer ${token}`)
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        // User who is not logged in cannot query all songs
        it('should not be able to query all songs if not logged in', function (done) {
            chai.request(app)
                .get('/songs')
                .set('Authorization', `Bearer ${token}`)
                .end(function (err, res) {
                    res.should.have.status(401);
                    done();
                });
        });

        // Logged in user can query a specific song
        it('should be able to query a specific song', async () => {
            const song = await Song.findOne({ title: 'test song' });
            const res = (await agent.get(`/songs/${song._id}`));
            res.should.have.status(200);
            res.should.be.a('object');
        });

        // User who is not logged in cannot query a specific song
        it('should not be able to query a specific song if not logged in', async () => {
            const song = await Song.findOne({ title: 'test song' });
            const res = await chai.request(app).get(`/songs/${song._id}`);
            res.should.have.status(401);
        });

    });

    describe('Creating songs', () => {
        // Logged in user can create a song
        it('should be able to create a song', async () => {
            const album = await Album.findOne({ title: 'test album' });
            const res = await agent
                .post('/songs')
                .send({ title: 'test song', length: '3:00', featuredArtists: [], isSingle:false, highestChartPosition:null, singleReleaseDate:null, album: album._id });
            res.should.have.status(201);
            res.should.be.a('object');
        });

        // User who is not logged in cannot create a song
        it('should not be able to create a song if not logged in', function (done) {
            Album.findOne({ title: 'test album' }).then(album => {
                chai.request(app)
                    .post('/songs')
                    .send({ title: 'test song', length: '3:00', featuredArtists: [], isSingle:false, highestChartPosition:null, singleReleaseDate:null, album: album._id })
                    .end(function (err, res) {
                        res.should.have.status(401);
                        done();
                    });
            });
        });
    });


    describe('Updating songs', () => {
        // Logged in user can update a song
        it('should be able to update a song', async () => {
            const res = await agent
                .put(`/songs/${SAMPLE_ID}`)
                .send({ title: 'updated song', length: '3:00' });
            res.should.have.status(200);
            res.should.be.a('object');
        });

        // User who is not logged in cannot update a song
        it('should not be able to update a song if not logged in', async () => {
            const res = await chai.request(app)
                .put(`/songs/${SAMPLE_ID}`)
                .send({ title: 'updated song', length: '3:00' });
            res.should.have.status(401);
        });
    });

    describe('Deleting songs', () => {
        // Logged in user can delete a song
        it('should be able to delete a song', async () => {
            const res = await agent.delete(`/songs/${SAMPLE_ID}`);
            res.should.have.status(200);
            res.should.be.a('object');
        });

        // User who is not logged in cannot delete a song
        it('should not be able to delete a song if not logged in', async () => {
            const res = await chai.request(app).delete(`/songs/${SAMPLE_ID}`);
            res.should.have.status(401);
        });
    });

    after(async function () {
        await User.findOneAndDelete({ username: 'testone' });
        await Album.findOneAndDelete({ title: 'test album' });
        await Song.findOneAndDelete({ title: 'test song' });
        await Song.findOneAndDelete({ title: 'updated song' });
        agent.close();
    });
});

