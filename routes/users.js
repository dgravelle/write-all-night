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

function tokenCheck(re1, res, next) {
  console.log('checking token');
  if (!req.body.token) {
    res.sendStatus(403);
    res.send(JSON.stringify({ message: 'no token, no web site' }))
  }
  else {
    jwt.verify(req.body.token, config.secret, (err, decoded) => {
      if (err) {
        res.sendStatus(403).json({ message: 'cant authorize token provided, sorry' })
      }

      req.decoded = decoded;
      next();
    })
  }
}

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/', (req, res) => {
  console.log('req.body = ', req.body);

  Users.createUser(req.body).then(data => {
    var userToken = makeJWT(data);

    console.log('success : ', data);
    res.json({ token: userToken });
  })
  .catch(err => {
      console.log('error from routes: ', err);
      res.sendStatus(409);
      res.json({ message: err })
  });
});

router.get('/dashboard', tokenCheck, (req, res, next) => {
  console.log('hello from dashboard');
  res.send('hello from dashboard.')
})


module.exports = router;
