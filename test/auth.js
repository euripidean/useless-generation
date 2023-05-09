// test/auth.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, after } = require('mocha');
const app = require('../src/server');
const User = require('../src/models/User');

const should = chai.should();

chai.use(chaiHttp);

const agent = chai.request.agent(app);

describe('User', () => {

    before (function (done) {
        agent
            .post('/users/signup')
            .send({ username: 'testone', password: 'password' })
            .end(function (err, res) {
                if (err) return done(err);
                console.log(res.body);
                done();
            });
    });

     // Log in successfully
     it('should be able to login', function (done) {
        agent
            .post('/users/login')
            .send({ username: 'testone', password: 'password' })
            .end(function (err, res) {
                console.log(res.body);
                res.should.have.status(200);
                agent.should.have.cookie('nToken');
                done();
            });
    });

    // Log in attempt
    it('should not be able to login if they have not registered', function (done) {
        agent.post('/users/login', { username: 'wronguser', password: 'nope' }).end(function (err, res) {
          res.should.have.status(401);
          done();
        });
      });

    // Sign up
    it('should be able to signup', function (done) {
        User.findOneAndDelete({ username: 'testtwo' }, function () {
            agent
                .post('/users/signup')
                .send({ username: 'testtwo', password: 'password' })
                .end(function (err, res) {
                    console.log(res.body);
                    res.should.have.status(201);
                    agent.should.have.cookie('nToken');
                    done();
                });
        });
    });

    // Log out
    it('should be able to logout', function (done) {
        agent.get('/users/logout').end(function (err, res) {
            res.should.have.status(200);
            agent.should.not.have.cookie('nToken');
            done();
        });
    });

    //  Sign up attempt
    it('should not be able to signup if user already exists', function (done) {
        const user = new User({ username: 'testone', password: 'password' });
        user.save(function(err, user) {
        if (err) return done(err);

        agent
            .post('/users/signup')
            .send({ username: 'testone', password: 'password' })
            .end(function (err, res) {
                res.should.have.status(400);
                done();
            });
    })
    });

    after(function (done) {
        User.findOneAndDelete({ username: 'testone' }, function () {
            agent.close()
            done();
        });
    });
});
