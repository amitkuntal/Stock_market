const pg= require('pg');

const client = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.port
});
// const client = new pg.Client({
//   user: 'postgres',
//   host: "stocksmarket.cyzxugnvqjs1.us-east-2.rds.amazonaws.com",
//   database: 'stock_market',
//   password: "amit!12345",
//   port: 5432
// });
  module.exports = client