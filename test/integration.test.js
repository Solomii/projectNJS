process.env.NODE_ENV = 'test';

let httpMocks = require('node-mocks-http');
const chai = require('chai');
const { createNewShortUrl, deleteUrl, redirectToSite } = require('../service/handlers');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('TEST /service/handlers', () => {
  it('redirectToSite should redirect to external site', async () => {
    let req = httpMocks.createRequest({
      param: {
        urlCode: 'FJLGEh8l1'
      }
    });
    let res = httpMocks.createResponse();
    let next = function () { };
    let response = await redirectToSite(req, res, next);
    if (response.status === 302) {
      console.log("Response status:" + response.status)
    }
  });

  it('redirectToSite should return error for invalid urlCode', async () => {
    let req = httpMocks.createRequest({
      param: {
        urlCode: 'blaBla'
      }
    });
    let res = httpMocks.createResponse();
    let next = function () { };
    let response = await redirectToSite(req, res, next);
    if (response.status === 404) {
      return console.log("Response status:" + response.status)
    }
  });

  it('redirectToSite should send bad request to external site', async () => {
    let req = httpMocks.createRequest({
      param: {
        urlCode: ''
      }
    });
    let res = httpMocks.createResponse();
    let next = function () { };
    let response = await redirectToSite(req, res, next);
    if (response.status === 400 && response.message === "bad request") {
      return console.log("Response status:" + response.status)
    } 
  });

  it('createNewShortUrl should return invalid request', async () => {
    let req = httpMocks.createRequest({
      param: {
         
      }
    });
    let res = httpMocks.createResponse();
    let next = function () { };
    let response = await redirectToSite(req, res, next);
    if (response.status === 500) {
      console.log("Response status:" + response.status)
    }
  });

    it('createNewShortUrl should return url exist', async () => {
    let req = httpMocks.createRequest({
       body: {
        longUrl: "https://www.yakaboo.ua/ua/rizdvozavr-ta-spisok-nechemnjuhiv.html"
      }
    });
    let res = httpMocks.createResponse();
    let next = function () { };
    let response = await redirectToSite(req, res, next);
    if (response.status === 409) {
      console.log("Response status:" + response.status)
    }
  });

  it('createNewShortUrl should redirect to main page', async () => {
    let req = httpMocks.createRequest({
      body: {
        longUrl: "https://www.yakaboo.ua/ua/rizdvozavr-ta-spisok-nechemnjuhiv.html"
      }
    });
    let res = httpMocks.createResponse();
    let next = function () { };
    let response = await createNewShortUrl(req, res, next);
    if (response.status == 302) {
      console.log("Response status:" + response.status)
    }
  });

  it('deleteUrl should delete to main page', async () => {
    let req = httpMocks.createRequest({
      param: {
        urlCode: 'FJLGEh8l1'
      }
    });
    let res = httpMocks.createResponse();
    let next = function () { };
    let response = await deleteUrl(req, res, next);
    if (response.sendStatus == 302) {
      console.log("Response status:" + response.status)
    }
  });

    it('deleteUrl should return status 404', async () => {
    let req = httpMocks.createRequest({
      param: {
        urlCode: ''
      }
    });
    let res = httpMocks.createResponse();
    let next = function () { };
    let response = await deleteUrl(req, res, next);
    if (response.sendStatus == 404) {
      console.log("Response status:" + response.status)
    }
  });
});
