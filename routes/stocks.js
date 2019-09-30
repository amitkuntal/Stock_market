const api = require('./api_functions/stocks.js');
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')

jsonParser =  bodyParser.json()

router.get('/', function(req, res){
    api.showAllStock(req,res)
    .then((resolve)=>res.status(200).send(resolve.rows))
    .catch((err)=> res.status(400).send(err))
 });
 router.get('/:symbol', function(req, res){
     api.showStockForACompany(req.params.symbol)
     .then((resolve)=>res.status(200).send(resolve.rows))
     .catch((err)=> res.status(400).send(err))
 });

 router.put('/:id',jsonParser,function(req,res){
    api.updateStocks(req.body,req.params.id)
    .then((resolve)=>res.status(200).send(resolve.rows))
    .catch((err)=> res.status(400).send(err))
 })
 router.post('/',jsonParser,function(req,res){
         api.addStock(req.body)
         .then((resolve)=> res.status(200).send(resolve))
         .catch((err)=> res.status(400).send(err))
 })
 router.delete('/:id',function(req,res){
     api.deleteStock(req.params.id)
     .then((resolve)=> res.status(200).send(resolve))
     .catch((err)=> res.status(400).send(err))

 })

 module.exports = router