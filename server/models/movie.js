const Joi = require('joi');
const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
        minlength: 3
    },
    tmdbId: {
        type: Number,
        required: true,
    }, 
    genreName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    numberInStock: {
        type: Number,
        required: false,
        default: 5
    }
}))

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(2).max(100).required(),
        tmdbId: Joi.number().integer().required(),
        genreName: Joi.string().min(3).max(20).required(),
        description: Joi.string().min(100).required(),
        imageUrl: Joi.string().required(),
        year: Joi.string().required(),    
        rating: Joi.string().required(),    
        numberInStock: Joi.number().integer(),
    }
    return(Joi.validate(movie, schema));
}

exports.Movie = Movie;
exports.validate = validateMovie;