const morgan = require('mongoose-morgan');

const logger = morgan({
    connectionString: process.env.DB_CONNECT
},
{},
'short');

module.exports = (app) => {
    app.use(logger);
}