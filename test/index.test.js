'use strict';

var koaSsacl = require('../lib')
  , koa = require('koa')
  , chai = require('chai')
  , expect = chai.expect
  , Sequelize = require('sequelize')
  , co = require('co');

require('co-mocha');

describe('koa-ssacl', function () {
  it('should define a namespace and set the context', function *() {
    var actor = Math.random()
      , app = koa()
      , request;

    app.use(function *(next) {
      this.actor = actor;
      yield next;
    });

    app.use(koaSsacl());

    app.use(function *(next) {
      expect(Sequelize.cls.get('actor')).to.equal(actor);
      yield next;
    });

    app.use(function *(next) {
      this.body = {};
      yield next;
    });

    request = require('co-supertest').agent(app.listen());
    yield request.get('/').expect(200).end();
  });
});