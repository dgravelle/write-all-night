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

router.get('/:userId', (req, res) => {
  const id = req.params.userId;

  StoryProgress().select().where('user_id', id).first().then(data => {
    // console.log(data);

    Stories().select().where({ id: data.story_id }).first().then(data => {
      // console.log('story: ', data);

      var storyInfo = data;

      StoryProgress().select().where({ story_id: data.id, user_id: data.user_id }).then(progress => {

        var storyProgress = progress;
        var storyReport = {
          info: storyInfo,
          progress: progress
        }

        res.json(storyReport);
      })

    })
  })
  .catch(err => {
    console.log(err);
  })
})

module.exports = router;
