// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/write-all-night',
    migrations: './migrations',
    seeds: {
      directory: './seeds'
    }
  },



  production: {
    client: 'pg',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
