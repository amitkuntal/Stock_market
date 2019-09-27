var express = require('express');
var app = express();
const client = require('./db/db.js')
const url = require('url')
const queryString = require('querystring')
client.connect()
function showCompanies(req,res,symbol){
    if(symbol==undefined)
    {
        query='select * from companyinfo'
    }
    else{
        symbol=symbol.split('=')
        query = `select * from companyinfo where symbol='${symbol[1]}'`
    }
    client.query(query).then((resolve)=>res.send(resolve.rows))
}
function stocks(req,res,symbol){
    if(symbol==undefined)
    {
        query='select * from stocks'
    }
    else{
        symbol=symbol.split('=')
        query = `select * from stocks where symbol='${symbol[1]}'`
    }
    client.query(query).then((resolve)=>res.send(resolve.rows))
}

app.get('/', function(req, res){
    console.log(req.url)
   res.send("Hello world!");
});
app.get('/companies', function(req, res){
    urlParse = url.parse(req.url)
    showCompanies(req,res,urlParse.query)
});

app.get('/stocks', function(req, res){
    urlParse = url.parse(req.url)
    stocks(req,res,urlParse.query)
});

app.listen(3000);