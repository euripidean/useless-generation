require('dotenv/config')
const express = require('express')
const bodyParser = require('body-parser')
// const checkAuth = require('./middleware/checkAuth.js')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const populateDatabase = require('./populate.js')

// Set App Variable
const app = express()

// Use Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
    const now = new Date().toString()
    console.log(`Requested ${req.url} at ${now}`)
    next()
})

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

// app.use(checkAuth)

// Database Setup
require('./config/db-setup.js')

// Routes
const router = require('./routes/index.js')
app.use(router)

// Populate Database
if (process.env.NODE_ENV === 'production') {
    populateDatabase().then(() => {
        console.log('Database Populated')
    }).catch((err) => {
        console.log(err)
    })
  }

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Useless Generation listening on ${process.env.PORT}. Stay beautiful.`)
});

module.exports = app
