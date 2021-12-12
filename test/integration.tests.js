process.env.NODE_ENV = 'test';

let httpMocks = require('node-mocks-http');
const chai = require('chai');
const { createNewShortUrl, deleteUrl, redirectToSite } = require('../service/handlers');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('/service/handlers', () => {

      it('redirectToSite should redirect to external site', function(done) {
        let req = httpMocks.createRequest({
            param: {
                urlCode : 'FJLGEh8l1'
            }
        });
        let res = httpMocks.createResponse();
        let next = function() {};
        response = redirectToSite(req, res, next)
        if ((response.status = 302)) {
          console.log("Response status:"+response.status)
            done();
        } else {
            done(new Error("not redirected"));
        }
      });
  
       it('redirectToSite should return error for invalid urlCode', function(done) {
        let req = httpMocks.createRequest({
            param: {
                urlCode : 'blaBla'
            }
        });
        let res = httpMocks.createResponse();
        let next = function() {};
        response = redirectToSite(req, res, next)
        if ((response.status = 404)) {
          console.log("Response status:"+response.status)
            done();
        } else {
            done(new Error("404 expected"));
        }
       });
  
         it('redirectToSite should return invalid request', function(done) {
        let req = httpMocks.createRequest({
            param: {
                
            }
        });
        let res = httpMocks.createResponse();
        let next = function() {};
        response = redirectToSite(req, res, next)
        if ((response.status = 500)) {
          console.log("Response status:"+response.status)
            done();
        } else {
            done(new Error("500 expected"));
        }
      });
  
      
      
  

  
 });
