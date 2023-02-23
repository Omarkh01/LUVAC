const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password'); 
    
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password');

    let admin = user.isAdmin;
    if (admin === undefined) admin = false;

    const accessToken = user.generateAuthToken();

    // const refreshToken = jwt.sign(
    //     { _id: user._id },
    //     config.get('rtPrivateKey'), 
    //     { expiresIn: '1d' }
    // );
    // await User.findByIdAndUpdate(user._id, {refreshToken: refreshToken}, {new: true});
    
    // let maxAge = 24 * 60 * 60 * 1000;
    // res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: maxAge });

    res.send({token: accessToken, role: admin});
})

function validate(req){
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(req, schema);
}

module.exports = router;

