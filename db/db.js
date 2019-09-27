const pg= require('pg');
const client = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'stock_market',
    password: 'Amit123',
    port: 5432
  });
  module.exports = client