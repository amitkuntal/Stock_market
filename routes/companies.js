const api = require('./api_functions/companies.js');
const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const joiSchema = require('./../validate/companyDataValidate.js')

jsonParser =  bodyParser.json()

router.get('/', function(req, res, next){
    api.showAllCompanies()
    .then((data)=>res.status(200).send(data.rows))
    .catch(next)
});

router.get('/:symbol', function(req, res, next){
    
    api.showSpecificCompany(req.params.symbol)
    .then((data)=>{
        if(data.rowCount==0){
            res.status(400).send("Company Does not exist in records")
        }
        else{
            res.status(200).send(data.rows)
        }
    })
    .catch(next)
});
router.put('/:symbol',jsonParser,function(req, res, next){
    const validate = joiSchema.schemaForUpdateCompany.validate(req.body)
    if(validate.error)
    {
        res.status(400).send(validate.error.details[0].message)
    }
    else
    {
    api.updateCompany(req.body,req.params.symbol)
    .then((data)=>res.status(200).send(data.rows))
    .catch(next)
    }
})
router.post('/',jsonParser,function(req, res, next){
    const validate = joiSchema.schemaForNewCompany.validate(req.body)
    if(validate.error)
    {
        res.status(400).send(validate.error.details[0].message)
    }
    else{
    api.addCompany(req.body)
    .then((data)=> res.status(200).send(data.rows))
    .catch(next)
    }
    
})
router.delete('/:symbol',function(req, res, next){
    api.deleteCompany(req.params.symbol)
    .then((data)=>{
        if(data.rowCount == 0)
        {
            res.status(400).send("Company does not exist in records")
        }
        else{
            res.status(200).send("Successfully deleted")
        }
    })
    .catch(next)
})

module.exports = router