const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    const db = config.get('db');
    mongoose.set("strictQuery", false);
    mongoose
        .connect(db, { useUnifiedTopology: true })
        .then(() => console.log(`Connected to ${db}...`))
        .catch((ex) => console.log('Could not connect.'));
}

