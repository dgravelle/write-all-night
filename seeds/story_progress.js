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
        moment('2016-07-03 08:00:00'),
        moment('2016-07-05 10:00:00'),
        moment('2016-07-06 10:00:00'),
        moment('2016-07-07 10:00:00'),
        moment('2016-07-09 10:00:00')
      ]

      var word_total = 0;

      startDates.map(date => {
        makeStory(date)
      })

      function makeStory(date) {
        for (var i = 0; i < 60; i++) {
          stories.push(knex('story_progress').insert({
            user_id: 1,
            story_id: 1,
            word_total: word_total += _.random(25,50),
            date_saved: date.add(1, 'm').format()
          }));
        }
      }

      return Promise.all(stories);
    });
};
