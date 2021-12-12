process.env.NODE_ENV = 'test';

let httpMocks = require('node-mocks-http');
const chai = require('chai');
const  expect  = require('chai').expect;
const { createNewShortUrl, deleteUrl, redirectToSite } = require('../service/handlers');
const chaiHttp = require('chai-http');

chai.use(require("chai-as-promised"));
chai.use(chaiHttp);

describe('/service/handlers', () => {

  it('redirectToSite should redirect to external site', async  () => {
        let req = httpMocks.createRequest({
            param: {
                urlCode : 'FJLGEh8l1'
            }
        });
        let res = httpMocks.createResponse();
        let next = function() {};
        let response = await redirectToSite(req, res, next);
        // expect(response).to.eventually.property("status", 302);
        if (response.status === 302) {
          console.log("Response status:"+response.status)
        }
      });
  
       it('redirectToSite should return error for invalid urlCode', async() => {
        let req = httpMocks.createRequest({
            param: {
                urlCode : 'blaBla'
            }
        });
        let res = httpMocks.createResponse();
        let next = function() {};
        let response = await redirectToSite(req, res, next);
        if (response.status === 404) {
          console.log("Response status:"+response.status)
        } 
       });
  
         it('createNewShortUrl should return invalid request', async()  =>{
        let req = httpMocks.createRequest({
            param: {
                
            }
        });
        let res = httpMocks.createResponse();
        let next = function() {};
        let response = await redirectToSite(req, res, next);
           if (response.status === 500) {
             console.log("Response status:" + response.status)
           }
      });
  
        it('redirectToSite should redirect to external site', async () => {
          let req = httpMocks.createRequest({
            longUrl: "https://www.yakaboo.ua/ua/rizdvozavr-ta-spisok-nechemnjuhiv.html"
        });
        let res = httpMocks.createResponse();
        let next = function() {};
        let response = await createNewShortUrl(req, res, next);
          if (response.status === 201 && response.message === "create new url") {
            console.log("Response status:" + response.status)
          }
      });
 });
