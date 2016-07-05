var moment = require('moment');


// console.log(story1promise);

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('story_progress').del()
    .then(function () {

      var startDate = moment('2016-07-01 13:00:00');
      var story1promise = [];
      var date_saved = startDate;
      var word_total = 0;

      for (var i = 0; i < 60; i++) {

        story1promise.push(knex('story_progress').insert({
          user_id: 1,
          story_id: 1,
          word_total: word_total += 50,
          date_saved: startDate.add(1, 'm').format()
        }));
      }
      console.log();
      return Promise.all(story1promise);
    });
};
