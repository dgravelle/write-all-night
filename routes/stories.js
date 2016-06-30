const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Stories = knex('stories');

console.log('stories route');

router.post('/', (req, res) => {
  console.log(req.body);
  Stories.insert(req.body, '*').then(story => {
    res.json(story);
  })
});

module.exports = router;
