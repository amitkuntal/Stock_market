const express = require('express');
const app = express();
const companies = require('./routes/companies.js')
const stocks = require('./routes/stocks.js')
const client = require('./db/db.js')
const logger = require('./logger/logger.js')

client.connect().catch((err)=> logger.info(err.message))

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.use(function(req,res,next){
   logger.info(req.url)
   next()
})

app.use('/companies',companies)
app.use('/stocks',stocks)

app.use(function(err,res){
   res.status(400).send(err.message)
})

app.listen(3000);