process.env.NODE_ENV = 'test';
require("dotenv").config();
// const request = require('supertest');

const { Url } = require('../models/url');
const chai = require('chai');
const  expect  = require('chai').expect;
const chaiHttp = require('chai-http');
const { app } = require('../server');
const knex = require("../config/db")
let should = chai.should();

chai.use(chaiHttp);

describe('Test Url', () => {
    // beforeEach((done) => { //Перед каждым тестом чистим базу
    //     Url.remove({}, (err) => { 
    //        done();         
    //     });     
    // });
  


  before(function () {
    // common suite timeout that doesn't really need to be placed inside before block
    this.timeout(60000); 
  }); 
  // ...
  afterEach(function (done) {
    this.timeout(120000);
    // ...
    done();
  });
  
  const urlss = {
    _id: null,
    urlCode: "S_oxYhYsL",
    longUrl: "https://www.yakaboo.ua/ua/mazepa-hronika-pravoslavnogo-shljahticha-ruina.html",
    shortUrl: "http://localhost:3000/S_oxYhYsL",
    clicks:0,

  };

 describe("GET /", () => {
    it("it should ALL long the url", (done) => {
      chai.request(app)
        .get('/')
        .send(urlss)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        })

    })

  });

  describe("POST /api/url/shorten", () => {
    it("it should long the url", (done) => {
      chai.request(app)
        .post('/api/url/shorten')
        .send(urlss)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('longUrl').eq("https://www.yakaboo.ua/ua/mazepa-hronika-pravoslavnogo-shljahticha-ruina.html");
          done();
        })

    })

    it("it should NOT long the url", (done) => {
      chai.request(app)
        .post('/api/url/shorten')
        .send({
          longUrl: 'htt://medium.com/@xoor/jwt-authentication-service-44658409e12c',
        })
        .end((err, res) => {
          res.status.should.equal(401);
          done();
        })

    })

  });

    describe("GET /:urlCode", () => {
      it("It should GET a urlss by urlCode", (done) => {
            chai.request(app)                
                .get("/" + urlss.urlCode)
              .end((err, res) => {
                should.equal(err, null);
                expect(urlss.urlCode).to.equal("S_oxYhYsL");
                done();
                });
        });

      it("It should NOT GET a urlss by urlCode", (done) => {
          const urlCode = 'S_oxYhYsV'
            chai.request(app)                
                .get("/" + urlCode)
              .end((err, res) => {
                  res.should.have.status(404);
                  res.body.should.have.property('message').eql("no url found");
                done();
                });
        });

    });



  
 });

  
