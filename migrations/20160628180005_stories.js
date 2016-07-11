
exports.up = function(knex, Promise) {
  return new Promise.all([
    knex.schema.createTable('stories', t => {
      t.increments();
      t.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
      t.integer('user_id');
      t.string('title');
      t.text('story_content');
      t.integer('word_goal');
      t.integer('word_total');
      t.boolean('deadline');
      t.date('deadlineStarts');
      t.date('deadlineEnds');
    })
  ])
};

exports.down = function(knex, Promise) {
  return new Promise.all([
    knex.schema.dropTable('stories')
  ]);
};
