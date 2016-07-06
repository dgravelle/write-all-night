var moment = require('moment');


// console.log(stories);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('story_progress').del()
    .then(function () {

      var stories = [];
      var startDates = [
        moment('2016-06-30 13:00:00'),
        moment('2016-07-01 08:00:00'),
        moment('2016-07-02 08:00:00'),
        moment('2016-07-03 08:00:00'),
        moment('2016-07-05 10:00:00'),
        moment('2016-07-06 10:00:00'),
        moment('2016-07-13 10:00:00'),
        moment('2016-07-14 10:00:00'),
        moment('2016-07-15 10:00:00')
      ]

      var word_total = 0;

      startDates.map(date => {
        // var i = Math.ceil(Math.random() * 10) * 5;
        makeStory(date, 50);
      })

      function makeStory(date, wordIncrement) {
        for (var i = 0; i < 60; i++) {
          stories.push(knex('story_progress').insert({
            user_id: 1,
            story_id: 1,
            word_total: word_total += wordIncrement,
            date_saved: date.add(1, 'm').format()
          }));
        }
      }

      return Promise.all(stories);
    });
};
