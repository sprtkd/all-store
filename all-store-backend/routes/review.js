const express = require('express');
const _ = require('lodash');
const auth = require('../middleware/auth');
const { Review } = require('../models/review');
const { User } = require('../models/user');
const { App } = require('../models/app');
const { mongoose } = require('mongoose');

const router = express.Router();

/*  
    TODO:
        1. ObjectId validation required for request id parameter
*/

// GET: /api/review/:id
// for now implementing with id, later implementation will be decided
router.get('/:id', [auth], async (req, res) => {

    let review = await Review.findOne({_id: req.params.id});
    if( review ) return res.json(review);

    return res.status(404).send("no review with the given id");
});

// POST: /api/review/
// assuming request body is validated from UI
router.post('/', [auth], async (req, res) => {
    let user = await User.findById(req.user._id);
    let app = await App.findById(req.body.appid);

    if( !app ) return res.status(404).send('invalid app id');

    review = new Review({
        user: user,
        app: app,
        rating: req.body.rating,
        text: req.body.text
    });
        
    await review.save();
    res.status(201).json(review);
});

// PUT: /api/review/:id
router.put('/:id', [auth], async (req, res) => {
    res.send('implementaion yet to be done');
});

// DELETE: /api/review/:id
router.delete('/:id', [auth], async (req, res) => {

    let review = await Review.findById(req.params.id);
    if( !review ) return res.status(404).send('no review found with the given id');

    if( review.user._id.equals(req.user._id) ) {
        Review.findByIdAndDelete(req.params.id, (err, result) => {
            if( err ) return res.status(500).send('something went wrong.');

            return res.status(200).send('deleted');
        });
    }
});

module.exports = router;