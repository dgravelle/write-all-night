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
    console.log(data);
    if(!data.success) {
      res.sendStatus(409);
      res.json({ message: err });
    }
    var userToken = makeJWT(data);

    var userInfo = {
      id: data.id,
      token: userToken,
      user: data.email
    }

    console.log(userInfo);
    
    res.json(userInfo);
  })
  .catch(err => {
    res.json({ message: err })
  });
});

router.get('/:id', tokenCheck, (req, res, next) => {

  Users.where({ id: req.decoded.id }).first().then(user => {
    res.json({ id: user.id, email: user.email });
  })
  .catch(err => {
    res.json(err)
  });

});

router.post('/login', (req, res) => {

  Users.authenticateUser(req.body.email, req.body.password).then(data => {

    var userToken = makeJWT(data);

    var userInfo = {
      id: data.id,
      token: userToken,
      user: data.email
    }

    res.json(userInfo);
  })
  .catch(err => {
    res.json(err);
  });

});


module.exports = router;
