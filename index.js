const express = require('express');
const app = express();
const companies = require('./routes/companies.js')
const stocks = require('./routes/stocks.js')
const client = require('./db/db.js')
client.connect()

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.use('/companies',companies)
app.use('/stocks',stocks)

app.listen(3000);