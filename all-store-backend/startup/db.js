const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('connected to db!'))
        .catch((err) => console.log('failed to connect to db! ERROR: ' + err));
};