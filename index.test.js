const request = require ('supertest');
const app = require('./index');

describe('Find the album and song',()=>{
    test ('GET the root path succeeds', ()=>{
        return request(app)
            .get('/')
            .expect (200);
    })

    test ('GET the root path return HTML', ()=>{
        return request(app)
            .get('/')
            .expect ('Content-type',/html/);
    })
})