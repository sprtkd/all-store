require('dotenv').config();
const express = require('express');

const app = express();

// startup files
require('./startup/db')();
require('./startup/routes')(app);

app.listen(process.env.PORT, () => {
    console.log(`listening on http://localhost:${process.env.PORT}`);
});