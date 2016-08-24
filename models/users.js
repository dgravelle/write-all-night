'use strict';

const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('../db/knex');
const Users = knex('users');

Users.createUser = (data) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(data.password, saltRounds, function(err, hash) {
      if (err) {
        return reject(err);
      }
      // Store hash in your password DB.
      data.pass_hash = hash;
      delete data.password;

      Users.insert(data, '*').then(data => {
        data[0].success = 'true'
        delete data[0].pass_hash;

        resolve(data[0]);
      })
      .catch(err => {
        err.success = false;
        // console.log('error in user model: ', err);
        reject(err);
      });
    });
  });
}

Users.authenticateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    Users.select().where({ email: email }).first().then((user) => {

      if (!user) {
        return reject('Sorry, that email and password does not match');
      }

      bcrypt.compare(password, user.pass_hash, (err, res) => {
        if (err || !res) {
          return reject('Sorry, that email and password does not match');
        }

        user = {
          id: user.id,
          email: user.email,
          name: user.name
        }

        return resolve(user);
      });
    });
  });
}

module.exports = Users;
