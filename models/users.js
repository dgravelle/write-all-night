'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('../db/knex');
const Users = knex('users');

Users.createUser = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    bcrypt.hash(data.password, saltRounds, function(err, hash) {
      if (err) {
        return reject(err);
      }
      // Store hash in your password DB.
      data.pass_hash = hash;
      delete data.password;

      Users.insert(data, '*').then(data => {
        console.log(`user created `, data);
        resolve(data[0]);
      })
      .catch(err => {
        console.log('error in user model: ', err);
        reject(err);
      });
    });
  });
}

Users.authenticateUser = (email, password, callback) => {
  Users.select().where({ email: email }).then((user) => {
    if (!user) {
      return callback('Sorry, that email and password does not match');
    }
    bcrypt.compare(password, user.pass_hash, (err, res) => {
      if (err || !res) {
        return callback('Sorry, that email and password does not match');
      }
      callback(undefined, user);
    });
  });
}

module.exports = Users;
