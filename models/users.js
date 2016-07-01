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

Users.authenticateUser = (email, password) => {
  console.log('authenticating');
  console.log('email: ', email);
  console.log('password: ', password);

  return new Promise((resolve, reject) => {
    Users.select().where({ email: email }).first().then((user) => {
      console.log(user);
      if (!user) {
        reject('Sorry, that email and password does not match');
      }
      bcrypt.compare(password, user.pass_hash, (err, res) => {
        if (err || !res) {
          reject('Sorry, that email and password does not match');
        }
        
        user = {
          id: user.id,
          email: user.email,
          name: user.name
        }
        resolve(user);
      });
    });
  });
}

module.exports = Users;
