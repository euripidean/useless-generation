const express = require('express')
const router = express.Router();

const User = require('../models/user')

/** Route to get all users. */
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

/** Route to get one user by id. */
router.get('/:userID', async (req, res) => {
    const { userID } = req.params;
    try {
      const user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  });

/** Route to add a new user to the database. */
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.create({ username, password });
      return res.status(201).json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  });

/** Route to update an existing user. */
router.put('/:userId', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      return res.json({ user });
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  });

/** Route to delete a user. */
router.delete('/:userId', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId);
        return res.json({ user });
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router

