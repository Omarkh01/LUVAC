const jwt = require('jsonwebtoken');
const config  = require('config');
const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => { 
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken: refreshToken });
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        config.get('rtPrivateKey'),
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = foundUser.generateAuthToken();
            res.json({ accessToken });
        }
    );
})

module.exports = router;