process.env.NODE_ENV = 'test';
require("dotenv").config();

const { Url } = require('../models/url');
const chai = require('chai');
const  expect  = require('chai').expect;
const chaiHttp = require('chai-http');
const { app } = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Test Url', () => {
    // beforeEach((done) => { 
    //     Url.remove({}, (err) => { 
    //        done();         
    //     });     
    // });

  let returnedUrlObject;
    const longUrlObject = {
    longUrl: "https://www.yakaboo.ua/ua/mazepa-hronika-pravoslavnogo-shljahticha-ruina.html"
  };

 describe("GET /", () => {
    it("it should return main page", (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a('object');
          expect(res.headers['content-type']).to.have.string('text/html');
          done();
        })
    })
  });

  describe("POST /api/url/shorten", () => {
    it("it should return long url", (done) => {
      chai.request(app)
        .post('/api/url/shorten')
        .send(longUrlObject)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          returnedUrlObject = res.body;
          res.body.should.be.a('object');
          res.body.should.have.property('longUrl').eq("https://www.yakaboo.ua/ua/mazepa-hronika-pravoslavnogo-shljahticha-ruina.html");
          res.body.should.have.property('_id');
          res.body.should.have.property('urlCode');
          res.body.should.have.property('shortUrl');
          res.body.should.have.property('clicks');
          res.body.should.have.property('date');
          done();
        })
    })

    it("it should return validation error for invalid url", (done) => {
      chai.request(app)
        .post('/api/url/shorten')
        .send({
          longUrl: 'htt://medium.com/@xoor/jwt-authentication-service-44658409e12c',
        })
        .end((err, res) => {
          res.status.should.equal(401);
          res.body.should.have.property('message').eql("Invalid long url");
          done();
        })
    })
  });

    describe("GET /:urlCode", () => {
      it("It should return other site by urlCode", (done) => {
            chai.request(app)                
                .get("/" + returnedUrlObject.urlCode)
              .end((err, res) => {
                res.should.have.status(200);
                should.equal(err, null);
                expect(res.headers['content-type']).to.have.string('text/html');
                done();
                });
        });

      it("It should return error by invalid urlCode", (done) => {
          const urlCode = 'thisIsInvalidUrlCode'
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

  
