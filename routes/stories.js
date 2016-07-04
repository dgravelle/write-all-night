const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const Stories = knex('stories');
const StoryProgress = knex('story_progress');


/*
Query for getting the latest project

select ta.word_total as Word_Total, ta.date_saved as last_save
  from story_progress ta
    inner join (
      select max(date_saved) as max_date
      from story_progress
    ) as tb on ta.date_saved = tb.max_date;

*/


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
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('progres update error: ', err);
    res.sendStatus(500);
  })

})

module.exports = router;
