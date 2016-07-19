var moment = require('moment');
var _ = require('lodash');


// console.log(stories);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('story_progress').del()
    .then(function () {

      var stories = [];
      var startDates = [
        Date(2016,07,01,08,00,00),
        Date(2016,07,02,08,00,00),
        Date(2016,07,03,10,00,00),
        Date(2016,07,04,10,00,00),
        Date(2016,07,05,10,00,00),
        Date(2016,07,06,10,00,00)
      ]

      var startDates2 = [
        new Date(Date.UTC(2016,06,01,08)),
        new Date(Date.UTC(2016,06,02,08)),
        new Date(Date.UTC(2016,06,03,08)),
        new Date(Date.UTC(2016,06,04,08)),
        new Date(Date.UTC(2016,06,07,08)),
        new Date(Date.UTC(2016,06,08,08)),
        new Date(Date.UTC(2016,06,09,08)),
        new Date(Date.UTC(2016,06,10,08)),
        new Date(Date.UTC(2016,06,11,08)),
        new Date(Date.UTC(2016,06,12,08)),
        new Date(Date.UTC(2016,06,13,08)),
        new Date(Date.UTC(2016,06,14,08))
      ]

      var word_total = 0;

      startDates2.map(date => {
        makeStory(date);
      })

      function makeStory(date) {
        if (moment(date, 'String').get('date') > 7) {
          for (var i = 0; i < 60; i++) {
            stories.push(knex('story_progress').insert({
              user_id: 1,
              story_id: 1,
              word_total: word_total += 45,
              date_saved: moment(date, 'String').add(1, 'm').format()
            }));
          }
        }
        else if (moment(date, 'String').get('date') > 5) {
          for (var i = 0; i < 60; i++) {
            stories.push(knex('story_progress').insert({
              user_id: 1,
              story_id: 1,
              word_total: word_total += 0,
              date_saved: moment(date, 'String').add(1, 'm').format()
            }));
          }
        }
        else {
          for (var i = 0; i < 60; i++) {
            stories.push(knex('story_progress').insert({
              user_id: 1,
              story_id: 1,
              word_total: word_total += 20,
              date_saved: moment(date, 'String').add(1, 'm').format()
            }));
          }
        }
      }

      return Promise.all(stories);
    });
};
