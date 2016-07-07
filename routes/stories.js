const express = require('express');
const router = express.Router();
const moment = require('moment');
const knex = require('../db/knex');
const Stories = knex('stories');
const StoryProgress = knex('story_progress');



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

router.put('/saveContent/:id', (req, res) => {
  const id = req.params.id;
  console.log('saving story');
  console.log(id);
  console.log(req.body.content);

  Stories.update({ 'story_content': req.body.content }).where({ user_id: id }).then(data => {
    console.log('success',data);
    res.json(data);
  })
  .catch(err => {
    res.json(err);
  })
});

router.get('/calendar/:id', (req, res) => {
  console.log('/calendar/:id');
  var firstDate = moment([2016, 7 - 1])
  var lastDate = moment().endOf('month');
  const id = req.params.id;
  console.log(id);

  StoryProgress.select().where({ user_id: id }).andWhere('date_saved', '>=', firstDate.format()).orderBy('date_saved', 'asc')
  .then(data => {
    console.log(data);
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

    res.json(results);
  })
  .catch(err => {
    res.json(err);
  })
});

router.get('/:id', (req, res) => {
  console.log('id: ', req.params.id);

  Stories.select().where({ id: req.params.id }).first().then(story => {
    console.log('story: ', story);

    res.json(story);
  })
  .catch(err => {
    console.log(err);

    res.json(err);
  })
});

router.get('/all/:id', (req, res) => {
  const user_id = req.params.id;

  console.log('user_id: ', user_id);

  Stories.select().where({ user_id: user_id }).then(stories => {
    console.log(stories);
    res.json(stories);
  })
  .catch(err => {
    res.json(err);
  })
});


router.get('/latest/:id', (req, res) => {
  const user_id = req.params.id;
  console.log(user_id);
  StoryProgress.select().where({ user_id: user_id }).first().then(latest => {
    console.log('latest', latest);
    if (!latest) {
      res.json('no stories')
    }
    else {
      res.json(latest);
    }
  });
});


router.post('/saving-progress', (req, res) => {
  console.log('saving progress: ', req.body);

  StoryProgress.insert({
    user_id: req.body.user_id,
    story_id: req.body.story_id,
    date_saved: new Date(),
    word_total: req.body.word_count
  }).then(data => {
    console.log('data returned from progress update: ', data);
    res.json(data);
  })
  .catch(err => {
    console.log('progres update error: ', err);
    res.sendStatus(500);
  })
})


module.exports = router;
