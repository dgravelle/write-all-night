
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('story_progress', t => {
      t.increments();
      t.integer('story_id');
      t.dateTime('date_saved');
      t.integer('word_count');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('story_progress')
  ])
};
