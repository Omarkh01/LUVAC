const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressWinston = require('express-winston');

// Cross Origin Resource Sharing
app.use(cors());

//middleware for cookies
app.use(cookieParser());

// built-in middleware for json 
app.use(express.json());

const logger = require('./startup/logging');

app.use(expressWinston.logger({
    winstonInstance: logger
}))

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);


const port = process.env.PORT || 8080;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = server;
