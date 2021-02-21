const Joi = require('joi');
const mongoose = require('mongoose');
const passwordComplexity = require('joi-password-complexity').default;

// schema for password validation
const complexityOptions = {
    min: 6,
    max: 20,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4,
};

// user schema (model)
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, maxlength: 50},
    name: {type: String, required: true, maxlength: 50},
    email: {type: String, required: true, unique: true},
    contact: {type: String, required: true},
    password: {type:String, required: true}
},
{ timestamps: true });

const User = mongoose.model("User", userSchema);

// schema for user validation logic
const schema = Joi.object({
    username: Joi.string().max(50).required(),
    name: Joi.string().max(50).required(),
    email: Joi.string().required().email(),
    contact: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    password: passwordComplexity(complexityOptions).required()
});

module.exports.User = User;
module.exports.userSchema = userSchema;
module.exports.Schema = schema;