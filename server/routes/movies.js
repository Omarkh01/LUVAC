const { Movie, validate } = require('../models/movie');
const express = require('express');
const { Genre } = require('../models/genre');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // const genre = await Genre.findById(req.body.genreId);
    // if(!genre) return res.status(400).send('Invalid genre..'); 

    const movie = new Movie({
        title: req.body.title,
        tmdbId: req.body.tmdbId,
        genreName: req.body.genreName,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        year: req.body.year,
        rating: req.body.rating,
        numberInStock: req.body.numberInStock,
    });
    await movie.save();
    res.send(movie);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const { id } = req.params;
    const update = req.body;

    const movie = await Movie.findByIdAndUpdate(id, update, {new: true});

    if(!movie) return res.status(404).send('The movie with the given id was not found..');

    res.send(movie);
})  

router.delete('/', async (req, res) => {
    // const movie = await Movie.findByIdAndRemove(req.params.id);
    // if(!movie) return res.status(404).send('The movie with the given id was not found..');
    
    const query = { imageUrl: { $regex: "https" } };
    const result = await Movie.deleteMany(query);

    res.send("Deleted " + result.deletedCount + " documents");
})

module.exports = router;