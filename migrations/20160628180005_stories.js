
exports.up = function(knex, Promise) {
  return new Promise.all([
    knex.schema.createTable('stories', t => {
      t.increments();
      t.string('title');
      t.text('story');
      t.integer('word_goal');
      t.date('deadline');
    })
  ])
};

exports.down = function(knex, Promise) {
  return new Promise.all([
    knex.schema.dropTable('stories')
  ]);
};
