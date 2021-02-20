const express = require('express');
const bodyParser = require('body-parser');
const user = require('../routes/user');
const App = require('../routes/app');
const review = require('../routes/review');
var cors = require('cors')

// intializing express router
const router = express.Router();

// all the route handlers should be configured here
module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(cors());
    app.options('*', cors())
    app.use('/api/user', user);
    app.use('/api/app', App);
    app.use('/api/review', review);
};