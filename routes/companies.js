const api = require('./api_functions/companies.js');
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')

jsonParser =  bodyParser.json()

router.get('/', function(req, res){
    api.showAllCompanies()
    .then((resolve)=>res.status(200).send(resolve.rows))
    .catch((err)=> res.status(400).send(err))
});

router.get('/:symbol', function(req, res){
    
    api.showSpecificCompany(req.params.symbol)
    .then((resolve)=>res.status(200).send(resolve.rows))
    .catch((err)=> res.status(400).send(err))
});
router.put('/:symbol',jsonParser,function(req,res){
    api.updateCompany(req.body,req.params.symbol)
    .then((resolve)=>res.status(200).send(resolve.rows))
    .catch((err)=> res.status(400).send(err))
})
router.post('/',jsonParser,function(req,res){
    api.addCompany(req.body)
    .then((resolve)=> res.status(200).send(resolve.rows))
    .catch((err)=> res.status(400).send(err))
})
router.delete('/:symbol',function(req,res){
    api.deleteCompany(req.params.symbol)
    .then((resolve)=> res.status(200).send(resolve))
    .catch((err)=> res.status(400).send(err))
})

module.exports = router