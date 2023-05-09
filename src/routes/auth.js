const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express')
const router = express.Router();

// Async Await Route to get all users.
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        return res.json({ users });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// Authorization Routes

// SIGN UP
router.post('/signup', async (req, res) => {

    const { username, password } = req.body;
    const userExists = await User.findOne({ username }, 'username, password');
    try {
        if (userExists) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const user = await User.create({ username, password: password });
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
            expiresIn: "60 days"
        });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.status(201).json({ message: "User created", user });
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // check if user exists
        const user = await User.findOne({ username }, 'username password');
        if (!user) {
            return res.status(401).json({ error: 'Username issue' });
        }
        // check if password matches
        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Password Issue', passwordMatch });
        }
        // create token
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, {
            expiresIn: "60 days"
        });
        // set cookie with token
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.status(200).json({ message: "User logged in", user });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

// LOGOUT
router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.status(200).json({ message: "User logged out" });
});
       




module.exports = router
