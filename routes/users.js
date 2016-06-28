const express = require('express');
const router = express.Router();
const Users = require('../models/users');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  console.log(req.body);

  Users.createUser(req.body, (err, data) => {
    // do stuff
    console.log(data);
    res.json(data);
  })
})

router.post('/login', (req, res) => {
  console.log(req.body);

  Users.authenticateUser(req.body, (err, data) => {
    // do stuff
    console.log(data);
    res.json(data);
  })
})

module.exports = router;
