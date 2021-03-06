
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', t => {
      t.increments('id');
      t.string('email').notNullable().unique();;
      t.string('pass_hash');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
};
