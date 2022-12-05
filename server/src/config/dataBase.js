const { Pool } = require("pg")

module.exports = new Pool({
  host: process.env.HOST,
  port: process.env.DATABASEPORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})