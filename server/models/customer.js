const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    movieTitle: { 
        type: Array,
        required: true,
        minlength: 1,
        maxlength: 5
    },
    rentExpires: {
        type: Date,
        required: true,
    }
})

const Customer = new mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = {
        email: Joi.string().min(5).max(50).required(),
        movieTitle: Joi.array().min(1).max(5).required(),
        rentExpires: Joi.date(),
    }
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;