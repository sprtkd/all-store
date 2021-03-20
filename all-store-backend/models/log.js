const mongoose = require('mongoose');

// schema for storing logs for all the incoming api calls
const logSchema = new mongoose.Schema({
    method: {type: String, maxlength: 10},
    url: {type: String},
    status: {type: String, maxlength: 10},
    response_time: {type: String},
    message: {type: String}
},
{ timestamps: true });

const Log = mongoose.model("log", logSchema);


module.exports = Log;