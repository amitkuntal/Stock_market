const express = require('express');
const app = express();
const companies = require('./routes/companies.js')
const stocks = require('./routes/stocks.js')
const client = require('./db/db.js')
const logger = require('./logger/logger.js')
const jwt = require('jsonwebtoken');


client.connect().catch((err)=> {
   logger.error(err.message)
   process.exit()   
})

app.use('/', function(req, res,next){
 var token = req.query.token
 jwt.verify(token,process.env.KEY,function(err,info){
  if(info)
  {
     console.log(info)
     next()
  }
  else{
  res.send(err.message)
  }
   
 })
 
});

app.use(function(req,res,next){
   logger.info(req.url)
   next()
})

app.use('/companies',companies)
app.use('/stocks',stocks)

app.use(function(err,res){
   logger.error(err.message)
   res.status(500).send("Internal Server Error")
})

app.listen(3000);