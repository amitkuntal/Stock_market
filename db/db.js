const pg= require('pg');

const client = new pg.Client({
      user: process.env.USER,
      host: process.env.HOST,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
      port: process.env.port
    });
  module.exports = client