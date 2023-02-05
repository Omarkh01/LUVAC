const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const router = express.Router();
const {Genre, validate} = require('../models/genre');

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
})

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    let isGenreExist = await Genre.findOne({ name: req.body.name });
    if(isGenreExist) return res.status(400).send('A genre with the given name already registered.');

    const genre = new Genre({ name: req.body.name });
    await genre.save();
    
    res.send(genre);
})

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, 
        {name: req.body.name},
        {new: true});
    if(!genre) return res.status(404).send('The genre with the given id was not found.');
    
    res.send(genre);
})

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    
    if(!genre) return res.status(404).send('The genre with the given id was not found.');
    
    res.send(genre);
})

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    
    if(!genre) return res.status(404).send('The genre with the given id was not found.');
    
    res.send(genre);
})

module.exports = router;