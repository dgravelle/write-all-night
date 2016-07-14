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

  StoryProgress().select().where('user_id', id).orderBy('date_saved', 'desc').first().then(data => {
    // console.log(data);

    Stories().select().where({ id: data.story_id }).first().then(data => {
      // console.log('story: ', data);

      var storyInfo = data;

      StoryProgress().select().where({ story_id: data.id, user_id: data.user_id }).orderBy('date_saved').then(data => {

        var results = [];
        var lastEntry;
        var currentDay = moment(data[0]).get('date');

        for (var i = 0; i < data.length; i++) {

          if (currentDay !== moment(data[i].date_saved).get('date')) {
            currentDay = moment(data[i].date_saved).get('date');
            lastEntry = null;
          }
          else {
            if (!lastEntry) {
              lastEntry = data[i];
              results.push(lastEntry);
            }
            else if (lastEntry.date_saved < data[i].date_saved) {
              results.splice(results.indexOf(lastEntry), 1, data[i]);
              lastEntry = data[i];
            }
          }
        }

        var storyReport = {
          info: storyInfo,
          progress: results
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
