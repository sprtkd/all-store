const express = require('express');
const _ = require('lodash');
const auth = require('../middleware/auth');
const { Device } = require('../models/device');
const { User } = require('../models/user');
const mongoose = require('mongoose');

const router = express.Router();

/*
    1. request body validation need to be implemented for POST: /api/device
 */

// GET: /api/device/:id
// ideally requires a special role, will be implemented later
router.get('/:id', [auth], async (req, res) => {

    if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return res.status(400).send('not a valid id');

    let device = await Device.findById(req.params.id);
    if( device ) return res.json(device);

    return res.status(404).send("no device with the given id");
});

// GET: /api/device/
router.get('/', [auth], async (req, res) => {
    
    let device = await Device.find({userid: req.user._id});
    if( device ) return res.status(200).send(device);

    return res.status(404).send("no devices were found");
});

// POST: /api/device
router.post('/', [auth], async (req, res) => {

    let user = User.findById(req.user._id);
    if( !user ) return res.status(400).send("user doesn't exist with the given id");

    req.body.userid = req.user._id;

    let device = new Device(req.body);
    device.save((err, result) => {
        if(err) return res.status(500).send("Internal server error");

        return res.status(200).send(_.pick(result, ["_id"]));
    });
});

// DELETE: /api/app/:id
router.delete('/:id', [auth], (req, res) => {
    // yet to be implemented
});

module.exports = router;