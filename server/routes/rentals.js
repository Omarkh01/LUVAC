const { Rental, validate } = require('../models/rental');
const {Movie} = require('../models/movie');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// const session: ClientSession = await mongoose.startSession();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send('Invalid customer..');
    
    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid movie..');
    
    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock..');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
	// TODO Add your statement here
        rental = await rental.save();

        movie.numberInStock--;
        movie.save()

        res.send(rental);
	// Commit the changes
	await session.commitTransaction();
    } 
    catch (error) {
	// Rollback any changes made in the database
	await session.abortTransaction();
    res.status(500).send('Something failed..');
	// Rethrow the error
	throw error;
    } 
    finally {
	// Ending the session
	session.endSession();
    }
})

module.exports = router;
