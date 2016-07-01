const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Stories = knex('stories');

router.get('/:id', (req, res) => {
  console.log(req.params.id);

  Stories.select().where({ id: req.params.id }).first().then(story => {
    console.log(story);

    res.json(story);
  })
  .catch(err => {
    console.log(err);

    res.json(err);
  })
})

router.post('/', (req, res) => {
  console.log(req.body);
  Stories.insert(req.body, '*').then(story => {
    res.json(story);
  })
  .catch(err => {
    console.log(err);

    res.json(err);
  })
});

module.exports = router;
