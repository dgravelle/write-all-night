const express = require('express');
const router = express.Router();
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
    res.sendStatus(500);
  })
})

router.post('/saving-progress', (req, res) => {
  console.log('saving progress: ', req.body);

  StoryProgress.insert({
    story_id: req.body.story_id,
    date_saved: new Date(),
    word_total: req.body.wordTotal
  }).then(data => {
    console.log('data returned from progress update: ', data);
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('progres update error: ', err);
    res.sendStatus(500);
  })

})

module.exports = router;
