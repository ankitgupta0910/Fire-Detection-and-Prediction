'use strict';
var ValidatedRequest = require('../../lib/index');
var ServerMock = require('mock-http-server');

describe('validated-request npm package get', function() {
  var validatedRequest = new ValidatedRequest([{ method: 'GET' }]);




  it('sends http get request', () => {
    var url = 'https://www.google.com';
    var headers = { 'Content-Type': 'application/json' };
    return validatedRequest.get(url, headers)
    .then(result => {
      expect(result.response).toBeDefined();
      expect(result.body).toBeDefined();
    });
  
  });
});

describe('validated-request npm package post', function() {



  var validatedRequest;



  validatedRequest = new ValidatedRequest([{ 
    method: 'POST', 
    body: { name: 'string', country: 'string' }
  }]);

    // Run an HTTP server on localhost:9000 
    var server = new ServerMock({ host: "localhost", port: 9000 });
    beforeEach(function(done) {server.start(done);});
 
    afterEach(function(done) {server.stop(done);});


  it('sends http post request', () => {



        server.on({
            method: 'POST',
            path: '/api/v1/log-request',
            reply: {
                status:  200,
                headers: { 'content-type': 'application/json' },
                body:    JSON.stringify({ ok: true, message: 'saved!' })
            }
        });





    var url = 'http://localhost:9000/api/v1/log-request';
    var headers = { 'Content-Type': 'application/json' };
    var name = 'John Smith';
    var country = 'USA';
    var body = { name, country };

    return validatedRequest.post(url, headers, body)
    .then(result => {
      // console.log('---- START ----');
      // console.log(result.body);
      // console.log('---- END ----');
      expect(result.response).toBeDefined();
      expect(result.body).toBeDefined();
    });
    // .catch(e => console.log(e));
  
  });
});