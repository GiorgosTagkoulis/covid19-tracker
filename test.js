/* eslint-disable mocha/no-mocha-arrows */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./index');

const { expect } = chai;

chai.use(chaiHttp);

describe('Test endpoints in the server', () => {
  describe('GET request /data', () => {
    it('should return status 200 for valid request', (done) => {
      chai
        .request(app)
        .get('/data')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res).to.have.status(200);
          expect(res.body).to.not.have.deep.keys('error');
          expect(res.body).to.have.deep.keys('date', 'resources');
          done();
        });
    });
  });
});
