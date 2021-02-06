require('dotenv').config();
const express = require('express');

const app = express();

// startup files
require('./startup/db')();
require('./startup/routes')(app);

app.listen(3000, () => {
    console.log('listening on http://localhost:3000');
});