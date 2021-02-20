require('dotenv').config();
const express = require('express');

const app = express();

// startup files
require('./startup/db')();
require('./startup/routes')(app);

app.listen(5000, () => {
    console.log('listening on http://localhost:5000');
});