// Importing Node modules and initializing Express
const express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

const cors = require('cors');
const { NODE_ENV, ROOT, SECRET, PORT, DB_URI } = require('./config');

// Start the server
const server = app.listen(PORT);
console.log('Your server is running on port ' + PORT + '.');

// Database Connection
mongoose.connect(DB_URI);

// Setting up basic middleware for all Express requests
if (process.env.NODE_ENV !== 'production') {
    app.use(logger('dev')); // Log requests to API using morgan
}

const publicPaths = [ '/',
    /\/login[\/(a-z)(A-Z)]*/,
    /\/register[\/(a-z)(A-Z)]*/ ];


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.disable('x-powered-by');
// Enable CORS from client-side
app.use(cors());

const router = require('./router');

router(app);
