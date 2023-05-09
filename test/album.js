const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, after } = require('mocha');
const app = require('../src/server');
const User = require('../src/models/User');
const Album = require('../src/models/Album');

const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(app);
let albumId;

describe('Album', () => {
    before(async function () {
        //create a user and a test album
        const res = await agent
          .post('/users/signup')
          .send({ username: 'testone', password: 'password' });
        
        const albumRes = await agent
          .post('/albums')
          .send({ title: 'test album', year: '2020', totalTracks: 10, chartPosition: 1, coverArtUrl: 'https://www.google.com', songs: [] });
        
        // Set albumId to be used later
        albumId = albumRes.body._id;
      });

    describe('Querying albums', () => {
        // Logged in user can query all albums
        it('should be able to query all albums', function (done) {
            agent
                .get('/albums')
                .end(function (err, res) {
                    res.should.have.status(200);
                    done();
                });
        });

        // Logged in user can query a specific album
        it('should be able to query a specific album', async () => {
            const album = await Album.findOne({ title: 'test album' });
            const res = await agent.get(`/albums/${album._id}`);
            res.should.have.status(200);
            res.should.be.a('object');
        });
    });

    describe('Creating albums', () => {
        // Logged in user can create an album
        it('should be able to create an album', function (done) {
            // delete test album
            Album.findOneAndDelete({ title: 'test album' })
            agent
                .post('/albums')
                .send({ title: 'test album', year: '2020', totalTracks: 10, chartPosition: 1, coverArtUrl: 'https://www.google.com', songs: [] })
                .end(function (err, res) {
                    res.should.have.status(201);
                    done();
                });
        });
    });

    describe('Updating albums', () => {
        // Logged in user can update an album
        it('should be able to update an album', async () => {
            const album = await Album.findOne({ title: 'test album' });
            const res = await agent
                .put(`/albums/${album._id}`)
                .send({ title: 'updated album', year: '2020', totalTracks: 10, chartPosition: 1, coverArtUrl: 'https://www.google.com', songs: [] });
            res.should.have.status(200);
            res.should.be.a('object');
        });
    });

    describe('Deleting albums', () => {
        // Logged in user can delete an album
        it('should be able to delete an album', async () => {
            const album = await Album.findOne({ title: 'updated album' });
            const res = await agent.delete(`/albums/${album._id}`);
            res.should.have.status(200);
            res.should.be.a('object');
        });
    });

 after(function (done) {
    // delete test user and test albums
    User.findOneAndDelete({ username: 'testone' })
        .then(() => {
            Album.findOneAndDelete({ title: 'test album' })
                .then(() => {
                    done();
                });
        });
    });
})

