process.env.NODE_ENV = 'test';
require("dotenv").config();
// const request = require('supertest');

const { Url } = require('../models/url');
const chai = require('chai');
const  expect  = require('chai').expect;
const chaiHttp = require('chai-http');
const { app } = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Test Url', () => {
    // beforeEach((done) => { //Перед каждым тестом чистим базу
    //     Url.remove({}, (err) => { 
    //        done();         
    //     });     
    // });
  
  const urlss = {
    longUrl: "https://www.yakaboo.ua/ua/mazepa-hronika-pravoslavnogo-shljahticha-ruina.html",
    shortUrl: "http://localhost:3000/S_oxYhYsL",

  };

  describe("POST /api/url/shorten", () => {
    it("it should long the url", (done) => {
      chai.request(app)
        .post('/api/url/shorten')
        .send(urlss)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('longUrl').eq("https://www.yakaboo.ua/ua/mazepa-hronika-pravoslavnogo-shljahticha-ruina.html");
          done();
        })

    })

       it("it should NOT long the url", (done) => {
      chai.request(app)
        .post('/api/url/shorten')
        .send(urlss)
        .end((err, res) => {

          done();
        })

    })

  })


  
 });

  
