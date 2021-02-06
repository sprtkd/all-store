const Joi = require('joi');
const mongoose = require('mongoose');

// app schema (model)
const appSchema = new mongoose.Schema({
    name: {type: String, required: true},
    icon: {type: String},
    rating: {type: Number, required: true, min: 0, max: 5, default: 0},
    downloads: {type: Number, default: 0},
    size: {type: Number}
},
{ timestamps: true });

const App = mongoose.model("App", appSchema);

// schema for app validation logic
const schema = Joi.object({
    name: Joi.string().max(50).required(),
    icon: Joi.string(),
    rating: Joi.number().min(0).max(5).default(0),
    downloads: Joi.number().default(0),
    size: Joi.number()
});

module.exports.App = App;
module.exports.appSchema = appSchema;
module.exports.Schema = schema;