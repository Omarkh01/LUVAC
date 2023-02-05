const { Genre } = require('../../models/genre');  
const { User } = require('../../models/user');
const request = require('supertest');

describe('auth middleware', () => {
    
    let token;
    let server;
    
    const exec = () => {
        return request(server)
        .post('/api/genres')
        .set('x-auth-token', token)
        .send({ name: 'genre1' });
    }
    
    beforeEach(() => {
        server = require('../../index');
        token = new User().generateAuthToken();
    })
    
    afterEach(async () => {
        await Genre.remove({});        
        await server.close();
    })
    
    it('should return 401 if no token is provided', async () => {
        token = '';

        const res = await exec();

        expect(res.status).toBe(401);
    });

    it('should return 400 if token is invalid', async () => {
        token = null;

        const res = await exec();

        expect(res.status).toBe(400);
    });

    it('should return 200 if token is valid', async () => {
        const res = await exec();

        expect(res.status).toBe(200);
    });

})