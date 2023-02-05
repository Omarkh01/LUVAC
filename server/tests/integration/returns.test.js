const moment = require('moment');
const request = require('supertest');
const { Rental } = require("../../models/rental");
const mongoose = require("mongoose");
const { User } = require("../../models/user");
const { Movie } = require('../../models/movie');


describe('/api/returns', () => {
    let server;
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;
    
    const exec = async () => {
        return await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId, movieId });
    }

    beforeEach( async () => {
        server = require('../../index');
        
        token = new User().generateAuthToken();
        
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();
        
        const movie = new Movie({
            _id: movieId,
            title: '12345',
            genre: {
                name: '12345',
            },
            numberInStock: 10,
            dailyRentalRate: 2,
        });
        await movie.save();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '5432464212'
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2 
            }
        })
        await rental.save();
    });
    
    afterEach( async () => { 
        await Rental.remove({});
        await Movie.remove({});
        await server.close();
    });
    

    it('should return 401 if client is not logged in', async () => {
        token = '';
        
        const res = await exec();
            
        expect(res.status).toBe(401);
    })

    it('should return 400 if customerId is not provided', async () => {
        customerId = '';

        const res = await exec();
            
        expect(res.status).toBe(400);
    })

    it('should return 400 if movieId is not provided', async () => {
        movieId = '';
        
        const res = await exec();
            
        expect(res.status).toBe(400);
    })

    it('should return 200 if we have a valid request', async () => {
        const res = await exec();
            
        expect(res.status).toBe(200);
    })

    it('should set the returnDate if input is valid', async () => {
        const res = await exec();
        
        const rentalInDb = await Rental.findById(rental._id);
        const currentDate = new Date();
        const diff = currentDate - rentalInDb.dateReturned;

        expect(diff).toBeLessThan(10 * 1000);  
    })

    it('should set the returnFee if input is valid', async () => {
        rental.dateOut = moment().add(-7, 'days').toDate();
        await rental.save();

        const res = await exec();

        const rentalInDb = await Rental.findById(rental._id);
        expect(rentalInDb.rentalFee).toBe(14);  
    })

    it('should increase the movie stock if input is valid', async () => {
        const res = await exec();

        const movieInDb = await Movie.findById(movieId);
        expect(movieInDb.numberInStock).toBe(11);  
    })

    it('should the rental if input is valid', async () => {
        const res = await exec();

        const rentalInDb = Rental.findById(rental._id);

        // expect(res.body).toHaveProperty('dateOut');  
        // expect(res.body).toHaveProperty('dateReturned');  
        // expect(res.body).toHaveProperty('rentalFee');  
        // expect(res.body).toHaveProperty('customer');  
        // expect(res.body).toHaveProperty('movie');  

        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['dateOut', 'dateReturned', 'rentalFee',
            'customer', 'movie']));
    })
})
