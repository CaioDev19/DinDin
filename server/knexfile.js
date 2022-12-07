// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config()
module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.HOST,
      port: process.env.DATABASEPORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: "dindin_migration",
    },
    migrations: {
      directory: `${__dirname}/src/config/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/config/seeds`,
    },
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.HOST,
      port: process.env.DATABASEPORT,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: `${__dirname}/src/config/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/config/seeds`,
    },
  },
}
