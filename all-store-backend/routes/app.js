const express = require('express');
const _ = require('lodash');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');
const { App, Schema } = require('../models/app');
const mongoose = require('mongoose');

const router = express.Router();

// GET: /api/app/:id
router.get('/:id', async (req, res) => {

    if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return res.status(400).send('not a valid object id');

    let app = await App.findById(req.params.id);
    if( app ) return res.json(app);

    return res.status(404).send("no app with the given id");
});

// GET: /api/app/:category
router.get('/:category', (req, res) => {
    res.send('Implementaion is not done yet!');
});

// POST: /api/app
// requires special permission for this, may be implemented later
router.post('/', [auth], async (req, res) => {
    const { error } = Schema.validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    app = new App(req.body);
    await app.save();
    
    res.status(201).json(app);
});

// DELETE: /api/app/:id
// requires special permission for this, may be implemented later
router.delete('/:id', [auth], (req, res) => {
    
    App.findByIdAndDelete(req.params.id, (err, result) => {
        if( err ) return res.status(500).send('something went wrong!');
        return res.status(200).send('deleted!');
    });
});

module.exports = router;