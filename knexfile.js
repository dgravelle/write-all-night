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
    connection: process.env.DATABASE_URL,
    migrations: './migrations',
    seeds: {
      directory: './seeds'
    }
  }

};
