

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
          story_content: null,
          word_goal: 50000,
          deadline: true,
          deadlineStarts: new Date('2016-07-01'),
          deadlineEnds: new Date('2016-07-31')
        })
      ]);
    });
};
