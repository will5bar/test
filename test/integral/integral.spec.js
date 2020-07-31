//process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./../../index.js');
let should = chai.should();


chai.use(chaiHttp);

describe('Test Plano', () => {
  /*
  * Test the /POST route
  */
  describe(' - /POST Plano', () => {
      it(' - Test', (done) => {
          let info = {
            "user" : "test",
            "pass" : "123"
          }
          
        chai.request(server)
            .post('/loginUser')
            .send(info)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message');
              done();
            });
      });

  });
});