var moment = require('moment');
var _ = require('lodash');


// console.log(stories);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('story_progress').del()
    .then(function () {

      var stories = [];
      var startDates = [
        moment('2016-07-01 08:00:00'),
        moment('2016-07-02 08:00:00'),
        moment('2016-07-03 10:00:00'),
        moment('2016-07-04 10:00:00'),
        moment('2016-07-05 10:00:00'),
        moment('2016-07-06 10:00:00'),
        moment('2016-07-07 10:00:00')
      ]

      var startDates2 = [
        moment('2016-07-01 08:00:00'),
        moment('2016-07-02 08:00:00'),
        moment('2016-07-03 08:00:00'),
        moment('2016-07-04 10:00:00'),
        moment('2016-07-05 10:00:00'),
        moment('2016-07-06 10:00:00'),
        moment('2016-07-07 10:00:00'),
        moment('2016-07-08 10:00:00'),
        moment('2016-07-09 10:00:00'),
        moment('2016-07-10 10:00:00'),
        moment('2016-07-11 10:00:00'),
        moment('2016-07-12 10:00:00'),
        moment('2016-07-13 10:00:00'),
        moment('2016-07-14 10:00:00')
      ]

      var word_total = 0;

      startDates2.map(date => {
        makeStory(date);
      })

      function makeStory(date) {
        console.log(date.get('date'));
        if (date.get('date') > 7) {
          for (var i = 0; i < 60; i++) {
            stories.push(knex('story_progress').insert({
              user_id: 1,
              story_id: 1,
              word_total: word_total += 45,
              date_saved: date.add(1, 'm').format()
            }));
          }
        }
        else if (date.get('date') > 5) {
          for (var i = 0; i < 60; i++) {
            stories.push(knex('story_progress').insert({
              user_id: 1,
              story_id: 1,
              word_total: word_total += 0,
              date_saved: date.add(1, 'm').format()
            }));
          }
        }
        else {
          for (var i = 0; i < 60; i++) {
            stories.push(knex('story_progress').insert({
              user_id: 1,
              story_id: 1,
              word_total: word_total += 20,
              date_saved: date.add(1, 'm').format()
            }));
          }
        }
      }

      return Promise.all(stories);
    });
};
