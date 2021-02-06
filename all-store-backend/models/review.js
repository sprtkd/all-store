const Joi = require('joi');
const {userSchema} = require('./user');
const {appSchema} = require('./app');
const mongoose = require('mongoose');
const { string, number } = require('joi');

// review schema (model)
const reviewSchema = new mongoose.Schema({
    user: { type: userSchema, required: true },
    app: { type: appSchema, required: true},
    rating: {type: Number, default: 0},
    text: {type: String}
},
{ timestamps: true });

const Review = mongoose.model("Review", reviewSchema);

module.exports.Review = Review;