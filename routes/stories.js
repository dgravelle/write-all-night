const express = require('express');
const router = express.Router();
const moment = require('moment');
const knex = require('../db/knex');

function Stories() {
  return knex('stories');
}

function StoryProgress() {
  return knex('story_progress');
}

router.post('/', (req, res) => {
  Stories().insert(req.body, '*').then(story => {
    res.json(story);
  })
  .catch(err => {
    res.json(err);
  })
});

router.post('/saveContent/:id', (req, res) => {
  const id = req.params.id;
  
  Stories().where({ id: id }).update({ 'story_content': req.body.content }).then(data => {
    res.json('ok');
  })
  .catch(err => {
    res.json('error updating story');
  });
});

router.get('/:id', (req, res) => {
  Stories().select().where({ id: req.params.id }).first().then(story => {
    res.json(story);
  })
  .catch(err => {
    res.json(err);
  })
});

router.get('/all/:id', (req, res) => {
  const user_id = req.params.id;

  Stories().select().where({ user_id: user_id }).then(stories => {
    res.json(stories);
  })
  .catch(err => {
    res.json(err);
  })
});


router.get('/latest/:id', (req, res) => {
  const user_id = req.params.id;

  StoryProgress().select().where({ user_id: user_id }).first().then(latest => {
    if (!latest) {
      res.json('no stories')
    }
    else {
      res.json(latest);
    }
  });
});


router.post('/saving-progress', (req, res) => {
  StoryProgress().insert({
    user_id: req.body.user_id,
    story_id: req.body.story_id,
    date_saved: new Date(),
    word_total: req.body.word_count
  }).then(data => {
    res.json(data);
  })
  .catch(err => {
    res.sendStatus(500);
  })
})


module.exports = router;
