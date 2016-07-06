const express = require('express');
const router = express.Router();
const moment = require('moment');
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

/*

Query for getting amount of entries from a specific user

select date(d) as day, count(story_id)
from generate_series(
  current_date - interval '30 day',
  current_date, '1 day'
) d
left join story_progress on date(story_progress.date_saved) = d
group by day order by day;

*/

/*

Tinkering with....
Query for getting amount of entries from a specific user

select date(d) as day
from generate_series(
  current_date - interval '30 day',
  current_date, '1 day'
) d
left join story_progress on date(story_progress.date_saved) = d
group by day order by day;

*/

/*

gets each date in the month of july in 2016

select date(d) as day
from generate_series(
    timestamp '2016-07-01',
    timestamp '2016-07-31', interval '1 day'
  ) d
left join story_progress on date(story_progress.date_saved) = d
group by day order by day;


*/

// select date_saved, word_total, story_id, user_id
// from story_progress t1
// where date_saved = (
//   select max(date_saved)
//   from story_progress t2
//   where t1.story_id = t2.story_id
// )
// group by story_id;

var firstDate = moment([2016, 7 - 1])
var lastDate = moment().endOf('month');

console.log(firstDate.format());

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

router.get('/calendar/', (req, res) => {

  StoryProgress.select().where('date_saved', '>=', firstDate.format()).orderBy('date_saved', 'asc')
  .then(data => {

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
    res.sendStatus(200);
  })
  .catch(err => {
    console.log('progres update error: ', err);
    res.sendStatus(500);
  })

})

module.exports = router;
