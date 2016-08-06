const story = require('../samples/moby.js');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stories').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('stories').insert({
          created_at: new Date(),
          user_id: 1,
          title: 'My Epic Story',
          story_content: story,
          word_goal: 50000,
          deadline: true,
          deadlineStarts: new Date(Date.UTC(2016,07,01,08)),
          deadlineEnds: new Date(Date.UTC(2016,07,31,08))
        })
      ]);
    });
};
