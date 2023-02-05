const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

// unit testing for user model
describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        // we need to know the payload ahead of time to compare with the token we have so we store it in PAYLOAD constant
        const payload = {
            _id: new mongoose.Types.ObjectId().toHexString(), // essential method to hex string 
            isAdmin: true
        };
        const user = new User(payload); 
        const token = user.generateAuthToken();
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decoded).toMatchObject(payload);
    })
})