'use strict';

var Sequelize = require('sequelize')
  , cls = require('continuation-local-storage')
  , co = require('co');

module.exports = function (options) {
  var namespace;

  if (Sequelize.cls) {
    namespace = Sequelize.cls;
  } else {
    namespace = cls.createNamespace('koa-ssacl');
    Sequelize.cls = namespace;
  }

  return function *(next) {
    var actor = this.actor;

    yield namespace.bind(function () {
      namespace.set('actor', actor);
      return co(next);
    })();
  };
};