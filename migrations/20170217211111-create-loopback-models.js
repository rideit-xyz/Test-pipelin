'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createCollection('user');
  db.createCollection('accessToken');
  db.createCollection('userCredential');
  db.createCollection('userIdentity');
  db.createCollection('ACL');
  db.createCollection('RoleMapping');
  db.createCollection('Role');
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
