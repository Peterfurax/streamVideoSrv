"use strict";
/*jslint node: true */
/*jshint esversion: 6 */
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
describe('app', () => {
  describe('#port', () => {
    it('should be a number', (done) => {
      server.port.should.be.a('number');
      done();
    });
    it('should be equal to 8000', (done) => {
      server.port.should.equal(8e3);
      done();
    });
  });
});
describe('Api response ', () => {
  describe('#GET', () => {
    it('should accept GET from : / ', (done) => {
      chai.request(server).get('/').end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
  describe('#POST', () => {
    it('should accept POST image multipart/form-data from : / ', (done) => {
      chai.request(server).post('/').set('content-type', 'multipart/form-data').attach('imageField', fs.readFileSync('test/img.jpg'), 'img.jpg').end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
    it('should accept POST video multipart/form-data from : / ', (done) => {
      chai.request(server).post('/').set('content-type', 'multipart/form-data').attach('imageField', fs.readFileSync('test/video.mp4'), 'video.mp4').end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
  describe('#PUT', () => {
    it('should accept PUT image multipart/form-data from : / ', (done) => {
      chai.request(server).put('/').set('content-type', 'multipart/form-data').attach('imageField', fs.readFileSync('test/img.jpg'), 'img.jpg').end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
    it('should accept PUT video multipart/form-data from : / ', (done) => {
      chai.request(server).put('/').set('content-type', 'multipart/form-data').attach('imageField', fs.readFileSync('test/video.mp4'), 'video.mp4').end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});
