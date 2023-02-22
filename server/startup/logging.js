const { format, transports, createLogger } = require("winston");
require("winston-mongodb");
require("express-async-errors");
// const dotenv = require('dotenv');

// dotenv.config();

const logger = createLogger({
  format: format.combine(format.json(), format.prettyPrint()),
  transports: [
    new transports.Console(),
    new transports.File({
      level: "info",
      filename: "info.log",
    }),
    new transports.MongoDB({
      level: "error",
      db: "mongodb://localhost/vidly",
      collection: "errorLogs",
    }),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: "uncaughtExceptions.log",
    }),
  ],
  rejectionHandlers: [
    new transports.File({
      filename: "uncaughtRejections.log",
    }),
  ],
});

module.exports = logger