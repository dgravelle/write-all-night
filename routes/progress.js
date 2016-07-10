const express = require('express');
const router = express.Router();
const moment = require('moment');
const knex = require('../db/knex');
const _ = require('lodash');

function Stories() {
  return knex('stories');
}

function StoryProgress() {
  return knex('story_progress');
}

router.get('/progress/:storyId', (req, res) => {
  const id = req.params.storyId;

  StoryProgress().select().where('story_id', storyId).then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  })
})

module.exports = router;
