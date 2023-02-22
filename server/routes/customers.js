const express = require('express');
const {Customer, validate} = require('../models/customer');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = new Customer({ 
        email: req.body.email,
        movieTitle: req.body.movieTitle,
        rentExpires: req.body.rentExpires
    });
    await customer.save();
    
    res.send(customer);
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, 
        {name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone}, 
        {new: true});
    if(!customer) return res.status(404).send('The customer with the given id was not found.');
    
    res.send(customer);
})

router.delete('/', async (req, res) => {
    // const customer = await Customer.findByIdAndRemove(req.params.id);
    // if(!customer) return res.status(404).send('The customer with the given id was not found.');
    // res.send(customer);

    const query = { email: { $regex: "com" } };
    const result = await Customer.deleteMany(query);

    res.send("Deleted " + result.deletedCount + " documents");
})

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    
    if(!customer) return res.status(404).send('The customer with the given id was not found.');
    
    res.send(customer);
})

module.exports = router;