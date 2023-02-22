const logger = require('./logging');
const mongoose = require('mongoose');
require('dotenv').config();

module.exports = function() {
    const db = process.env.MONGODB_URL;

    mongoose.set("strictQuery", true);
    mongoose
        .connect(db)
        .then(() => console.log(`Connected to ${db}...`))
        .catch((err) => logger.error(err));
}

