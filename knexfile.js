// Update with your config settings.
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  development: {
    client: "pg",
    connection:
      "postgres://hpzwiimtyzhews:e1555061b46353a4227c93f22377dcb784132d46c0374b2c161b76056f2204bd@ec2-23-21-128-35.compute-1.amazonaws.com:5432/d2atfr2mg59ih8",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seed: {
      directory: "./data/seeds"
    },
    useNullAsDefault: true
  }
};
