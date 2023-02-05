const winston = require('winston');
const { format } = winston;
require('winston-mongodb');
require('express-async-errors');

module.exports = function (){
    const logger = winston.createLogger({
        level: 'info',
        format: format.combine(
            format.json(),
            format.colorize()
        ),
        transports: [
            new winston.transports.File({
                filename: 'combined.log'
            })
        ],   
        exceptionHandlers: [
            new winston.transports.File({ 
                filename: 'uncaughtExceptions.log'
            })
        ],
        rejectionHandlers:[
            new winston.transports.File({ 
                filename: 'uncaughtRejections.log'
            })
        ], 
        exitOnError: true,
    })
    
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly'}));
}