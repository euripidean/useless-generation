const express = require('express')
const albumRoutes = require('./album.js')
const userRoutes = require('./user.js')
const songRoutes = require('./song.js')

const router = express.Router()

router.use('/albums', albumRoutes)
router.use('/users', userRoutes)
router.use('/songs', songRoutes)

module.exports = router
