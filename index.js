var express = require('express');
var app = express();
const api = require('./apifunctions.js');
app.get('/', function(req, res){
   res.send("Hello world!");
});
app.get('/companies', function(req, res){
    api.showAllCompanies(req,res)
});
app.get('/companies/:symbol', function(req, res){
    api.showSpecificCompany(req,res,req.params.symbol)
});
app.put('/companies/:symbol',function(req,res){
            api.updateCompany(req,res,req.query,req.params.symbol)
})

app.get('/stocks', function(req, res){
   api.showAllStock(req,res)
});
app.get('/stocks/:symbol', function(req, res){
    api.showStockForACompany(req,res,req.params.symbol)
});
app.put('/stocks/:symbol',function(req,res){
    api.updateStocks(req,res,req.query,req.params.id)
})

app.listen(3000);