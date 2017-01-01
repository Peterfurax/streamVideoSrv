// Require the dev-dependencies
let fs = require('fs');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../dist/server.min.js');
let should = chai.should();

// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
// Chai use
chai.use(chaiHttp);

describe('Api response ', () => {
  describe('POST', () => {
    it('should accept /POST image multipart/form-data to : / ', (done) => {
      chai.request(server).post('/')
      .set('content-type', 'multipart/form-data')
      .attach('imageField', fs.readFileSync('test/img.jpg'), 'img.jpg')
      .end((err, res) => {
        res.should.have.status(200);
        done();
        });
    });
    it('should accept /POST video multipart/form-data to : / ', (done) => {
      chai.request(server).post('/')
      .set('content-type', 'multipart/form-data')
      .attach('imageField', fs.readFileSync('test/video.mp4'), 'video.mp4')
      .end((err, res) => {
        res.should.have.status(200);
        done();
        });
    });
  });
  describe('GET', () => {
    it('should accept /GET to : / ', (done) =>{
      chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});
