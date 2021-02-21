const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const auth = require('../middleware/auth');
const { User, Schema } = require('../models/user');

const router = express.Router();

// GET: /api/user/
router.get('/', [auth], async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if( user ) return res.json(_.pick(user, ["username", "name", "email", "contact"]));

    return res.status(404).send("No user with the given id");
});

// POST: /api/user/register
router.post('/register', async (req, res) => {
    const { error } = Schema.validate(req.body);
    if( error ) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if( user ) return res.status(400).send('Email is already registered');

    user = new User(req.body);
    const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT));
    user.password = await bcrypt.hash(req.body.password, salt);
    
    await user.save();
    res.status(201).json(_.pick(req.body, ["username", "name", "email", "contact"]));
});

// POST: /api/user/login
// assuming : req body validation is done on client side
router.post('/login', async (req, res) => {
    let user = await User.findOne({email: req.body.email});
    if( user == null ) return res.status(404).send("Invalid credentials");

    const match = await bcrypt.compare(req.body.password, user.password);
    if( match ) {
        const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET);
        return res.header("access-token", token).send(_.pick(user, ["username", "email", "contact"]));
    }

    return res.status(401).send("Invalid credentials");
});

// PUT: /api/user/
router.put('/', [auth], async (req, res) => {

    user = await User.findOneAndUpdate(
        {_id: req.user._id},
        req.body,
        {new: true}
    )

    if(user) return res.status(200).send(_.pick(user, ["username", "email", "contact"]));
});

// DELETE: /api/user/
router.delete('/', [auth], (req, res) => {

    User.findOneAndRemove({_id: req.user._id}, (err, response) => {
        if(err){
            return res.status(404).send("No user found!");
        }

        return res.status(200).send("Deletion successful");
    })
});

module.exports = router;