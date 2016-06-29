const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config');

function makeJWT(user) {
  const token = jwt.sign(user, config.secret, {
    expiresIn: "2 days"
  });

  return token;
}

function tokenCheck(req, res, next) {
  console.log('checking token');
  console.log(req.headers);
  if (!req.headers.authorization) {
    res.status(403);
    res.json({ message: 'no token, no web site' });
  }
  else {
    jwt.verify(req.headers.authorization, config.secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'cant authorize token provided, sorry' })
      }
      else {
        req.decoded = decoded;
        next();
      }

    })
  }
}

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  Users.createUser(req.body).then(data => {
    var userToken = makeJWT(data);
    // console.log(data);

    var userInfo = {
      id: data.id,
      token: userToken,
      user: data.email
    }

    console.log('userinfo: ', userInfo);
    res.json(userInfo);
  })
  .catch(err => {
      console.log('error from routes: ', err);
      res.sendStatus(409);
      res.json({ message: err })
  });
});

router.get('/:id', tokenCheck, (req, res, next) => {
  console.log('req.decoded: ', req.decoded);

  Users.where({ id: req.decoded.id }).first().then(user => {
    console.log('user: ', user);

    res.json({ id: user.id, email: user.email });
  })
  .catch(err => {
    console.log('error in get user: ', err);
  })
})

router.post('/login', (req, res) => {
  console.log('req.body', req.body);

  Users.authenticateUser(req.body.email, req.body.password).then(data => {
    console.log('data from auth', data);

    var userToken = makeJWT(data);

    var userInfo = {
      id: data.id,
      token: userToken,
      user: data.email
    }

    res.json(userInfo);
  })
  .catch(err => {
    console.log('auth error: ', err);
    res.json(err)
  })
});


module.exports = router;
