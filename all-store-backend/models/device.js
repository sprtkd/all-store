const Joi = require('joi');
const mongoose = require('mongoose');

// device schema (model)
const deviceSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: {type: String, required: true, maxlength: 50},
    screen: {type: String, maxlength: 20},
    cpu: {type: String, maxlength: 20},
    memory: {type: String, maxlength: 20},
    browser: {type: String, maxlength: 20},
    language: {type: String, maxlength: 20},
    graphics: {type: String, maxlength: 20}
},
{ timestamps: true });

const Device = mongoose.model("Device", deviceSchema);

module.exports.Device = Device;