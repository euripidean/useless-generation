const express = require('express')
const router = express.Router();

const Message = require('../models/message')

/** Async Await Route to get all messages. */
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find();
        return res.json({ messages });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/** Async Await Route to get one message by id. */
router.get('/:messageId', async (req, res) => {
    const { messageId } = req.params;
    try {
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        return res.json({ message });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

/** Async await Route to add a new message. */
router.post('/', async (req, res) => {
    const { title, body, author } = req.body;
    try {
        const message = await Message.create({ title, body, author });
        return res.status(201).json({ message });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

/** Async await route to update a message by id */
router.put('/:messageId', async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.messageId, req.body, { new: true });
        return res.json({ message });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

/** Async await route to delete a message. */
router.delete('/:messageId', async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.messageId);
        return res.json({ message });
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
});

module.exports = router
