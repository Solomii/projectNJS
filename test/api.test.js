process.env.NODE_ENV = 'test';
const chai = require('chai');
const  expect  = require('chai').expect;
const chaiHttp = require('chai-http');
const { app } = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Test Url', () => {
    let urlCode;
    const longUrlObject = {
      longUrl: "https://www.yakaboo.ua/ua/mazepa-hronika-pravoslavnogo-shljahticha-ruina.html"
    };
  before((done) => {
    chai.request(app)
        .post('/api/url/shorten')
        .send(longUrlObject)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          urlCode = res.body.urlCode;
          res.body.should.be.a('object');
          done();
        })  
    });
  
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
    it("it should return url already exist", (done) => {
      chai.request(app)
        .post('/api/url/shorten')
        .send(longUrlObject)
        .end((err, res) => {
          urlCode = res.body.urlCode;
          console.log(urlCode)
          res.status.should.equal(409);
          res.body.should.have.property('message').eql("URL Already Exist");
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
                .get("/" + urlCode)
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
    
    describe("GET /delete/:urlCode", () => {
      it("It should return main page after delete", (done) => {
            chai.request(app)                
                .get("/delete/" + urlCode)
              .end((err, res) => {
                  should.not.exist(err);
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  expect(res.headers['content-type']).to.have.string('text/html');
                done();
                });
        });

      it("It should return statusCode if urlCode=null", (done) => {
          const urlCode = null
            chai.request(app)                
                .get("/delete/" + urlCode)
              .end((err, res) => {
                  res.should.have.status(404);
                done();
                });
      });
    });
 });

  
